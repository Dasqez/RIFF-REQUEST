import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, G, Line, Path, Pattern, RadialGradient, Rect, Stop } from 'react-native-svg';

import { Icon } from '@/components/Icon';
import { TrailLesson, trailLessons } from '@/data/lesson';
import { colors, displayText, radii } from '@/theme';

export type NodeStatus = 'done' | 'current' | 'locked';

export const TRAIL_HEIGHT = 1060;
const NODE = 76;
const BOSS_NODE = 92;

export function getStatus(index: number, lessonCompleted: boolean): NodeStatus {
  if (index === 0) {
    return lessonCompleted ? 'done' : 'current';
  }

  return index === 1 && lessonCompleted ? 'current' : 'locked';
}

function PulseRing({ size }: { size: number }) {
  const [pulse] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ]),
    );

    loop.start();

    return () => loop.stop();
  }, [pulse]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.ring,
        {
          width: size + 24,
          height: size + 24,
          borderRadius: (size + 24) / 2,
          opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.25, 0.7] }),
          transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1.08] }) }],
        },
      ]}
    />
  );
}

type NodeProps = {
  lesson: TrailLesson;
  index: number;
  status: NodeStatus;
  width: number;
  onSelect: (index: number, status: NodeStatus) => void;
};

function TrailNode({ lesson, index, status, width, onSelect }: NodeProps) {
  const size = lesson.boss ? BOSS_NODE : NODE;
  const left = (lesson.x / 100) * width;
  const onRight = lesson.x > 50;
  const iconName = status === 'done' ? 'check' : status === 'locked' ? 'lock' : lesson.icon;
  const iconColor = status === 'done' ? colors.black : status === 'current' ? colors.secondary : colors.textMuted;

  return (
    <>
      <View style={[styles.nodeSlot, { left: left - size / 2, top: lesson.y - size / 2, width: size, height: size }]}>
        {status === 'current' && <PulseRing size={size} />}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${lesson.boss ? 'Boss rozdziału' : `Lekcja ${index + 1}`}: ${lesson.title}${status === 'locked' ? ', zablokowana' : ''}`}
          onPress={() => onSelect(index, status)}
          style={({ pressed }) => [
            styles.node,
            { width: size, height: size, borderRadius: lesson.boss ? 26 : size / 2 },
            status === 'done' && styles.nodeDone,
            status === 'current' && styles.nodeCurrent,
            lesson.boss && status === 'locked' && styles.nodeBoss,
            pressed && styles.nodePressed,
          ]}
        >
          <Icon name={iconName} size={lesson.boss ? 34 : 30} color={iconColor} />
        </Pressable>
      </View>
      <TrailLabel lesson={lesson} index={index} status={status} left={left} onRight={onRight} size={size} />
    </>
  );
}

type LabelProps = { lesson: TrailLesson; index: number; status: NodeStatus; left: number; onRight: boolean; size: number };

function TrailLabel({ lesson, index, status, left, onRight, size }: LabelProps) {
  const placement = lesson.boss
    ? { left: left - 95, top: lesson.y + size / 2 + 14, width: 190, alignItems: 'center' as const }
    : onRight
      ? { left: left - size / 2 - 14 - 150, top: lesson.y - 38, width: 150, alignItems: 'flex-end' as const }
      : { left: left + size / 2 + 14, top: lesson.y - 38, width: 150, alignItems: 'flex-start' as const };
  const align = lesson.boss ? 'center' : onRight ? 'right' : 'left';
  const stateText = status === 'done' ? 'Ukończona' : status === 'current' ? 'Zacznij tutaj' : null;

  return (
    <View style={[styles.label, placement, status === 'current' && styles.labelCurrent]}>
      <Text style={[styles.labelEyebrow, lesson.boss && { color: colors.primary }, { textAlign: align }]}>
        {lesson.boss ? 'BOSS ROZDZIAŁU' : `LEKCJA ${index + 1}`}
      </Text>
      <Text style={[styles.labelTitle, { textAlign: align }]}>{lesson.title}</Text>
      <Text style={[styles.labelMeta, { textAlign: align }]}>
        {lesson.minutes} min  <Text style={styles.labelXp}>+{lesson.xp} XP</Text>
      </Text>
      {stateText && (
        <Text style={[styles.labelState, { textAlign: align, color: status === 'done' ? colors.success : colors.secondary }]}>
          {stateText}
        </Text>
      )}
    </View>
  );
}

function curve(from: TrailLesson, to: TrailLesson, width: number, endY = to.y) {
  const x1 = (from.x / 100) * width;
  const x2 = (to.x / 100) * width;
  const mid = (from.y + endY) / 2;

  return `M${x1} ${from.y} C${x1} ${mid} ${x2} ${mid} ${x2} ${endY}`;
}

function TrailBackground({ width }: { width: number }) {
  const strings = Array.from({ length: Math.floor(TRAIL_HEIGHT / 54) }, (_, index) => index * 54 + 20);

  return (
    <Svg width={width} height={TRAIL_HEIGHT} style={StyleSheet.absoluteFill}>
      <Defs>
        <Pattern id="dots" width={22} height={22} patternUnits="userSpaceOnUse">
          <Circle cx={11} cy={11} r={1.1} fill="#FFFFFF" fillOpacity={0.07} />
        </Pattern>
        <RadialGradient id="glowA" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={colors.primary} stopOpacity={0.28} />
          <Stop offset="1" stopColor={colors.primary} stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id="glowB" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={colors.secondary} stopOpacity={0.16} />
          <Stop offset="1" stopColor={colors.secondary} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Ellipse cx={width * 0.82} cy={200} rx={width * 0.6} ry={190} fill="url(#glowA)" />
      <Ellipse cx={width * 0.05} cy={470} rx={width * 0.55} ry={150} fill="url(#glowB)" />
      <Ellipse cx={width * 0.6} cy={1020} rx={width * 0.7} ry={170} fill="url(#glowA)" />
      {strings.map((y) => (
        <Line key={y} x1={0} y1={y} x2={width} y2={y} stroke={colors.secondary} strokeOpacity={0.05} strokeWidth={2} />
      ))}
      <Rect width={width} height={TRAIL_HEIGHT} fill="url(#dots)" />
    </Svg>
  );
}

function TrailRoute({ width, lessonCompleted }: { width: number; lessonCompleted: boolean }) {
  return (
    <Svg width={width} height={TRAIL_HEIGHT} style={StyleSheet.absoluteFill} pointerEvents="none">
      {trailLessons.slice(0, -1).map((lesson, index) => {
        const d = curve(lesson, trailLessons[index + 1], width);
        const done = index === 0 && lessonCompleted;
        const next = (index === 0 && !lessonCompleted) || (index === 1 && lessonCompleted);

        return (
          <G key={d}>
            {done && <Path d={d} stroke={colors.primary} strokeOpacity={0.3} strokeWidth={16} strokeLinecap="round" fill="none" />}
            <Path
              d={d}
              fill="none"
              strokeLinecap="round"
              stroke={done ? colors.primary : next ? colors.secondary : colors.line}
              strokeWidth={done ? 6 : 5}
              strokeDasharray={done ? undefined : next ? '8 12' : '1 13'}
            />
          </G>
        );
      })}
      <Path
        d={curve(trailLessons[4], trailLessons[4], width, 820)}
        fill="none"
        stroke={colors.line}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray="1 13"
      />
    </Svg>
  );
}

type TrailMapProps = { lessonCompleted: boolean; onSelect: (index: number, status: NodeStatus) => void };

export function TrailMap({ lessonCompleted, onSelect }: TrailMapProps) {
  const [width, setWidth] = useState(0);

  return (
    <View style={styles.trail} onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
      {width > 0 && (
        <>
          <TrailBackground width={width} />
          <TrailRoute width={width} lessonCompleted={lessonCompleted} />
          <View style={[styles.flag, { left: (trailLessons[0].x / 100) * width - 40 }]}>
            <Icon name="flag" size={12} color={colors.black} />
            <Text style={styles.flagText}>START</Text>
          </View>
          {trailLessons.map((lesson, index) => (
            <TrailNode
              key={lesson.title}
              lesson={lesson}
              index={index}
              status={getStatus(index, lessonCompleted)}
              width={width}
              onSelect={onSelect}
            />
          ))}
          <View style={styles.tease}>
            <Text style={styles.labelEyebrow}>ROZDZIAŁ 2</Text>
            <Text style={styles.teaseTitle}>Power chordy i riffy</Text>
          </View>
          <LinearGradient pointerEvents="none" colors={['rgba(11,10,9,0)', colors.background]} style={styles.fadeBottom} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  trail: { height: TRAIL_HEIGHT, marginHorizontal: -20, overflow: 'hidden' },
  nodeSlot: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', borderWidth: 3, borderColor: colors.secondary },
  node: { alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.border, backgroundColor: colors.surfaceRaised },
  nodeDone: { backgroundColor: colors.primary, borderColor: '#FFB27D', shadowColor: colors.primary, shadowOpacity: 0.5, shadowRadius: 14 },
  nodeCurrent: { backgroundColor: colors.primarySurface, borderColor: colors.secondary },
  nodeBoss: { borderColor: '#6B2D0B', backgroundColor: '#1B1410' },
  nodePressed: { transform: [{ scale: 0.94 }] },
  label: { position: 'absolute', padding: 10, gap: 2, borderRadius: radii.md - 2, borderWidth: 1, borderColor: colors.border, backgroundColor: 'rgba(23,20,18,0.88)' },
  labelCurrent: { borderColor: '#5A4214' },
  labelEyebrow: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1.4 },
  labelTitle: { color: colors.text, fontSize: 14, lineHeight: 18, fontWeight: '800' },
  labelMeta: { color: colors.textMuted, fontSize: 12 },
  labelXp: { color: colors.secondary, fontWeight: '800' },
  labelState: { fontSize: 12, fontWeight: '800' },
  flag: { position: 'absolute', top: 14, width: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 6, borderRadius: radii.pill, backgroundColor: colors.primary },
  flagText: { ...displayText, color: colors.black, fontSize: 14, letterSpacing: 1.2 },
  tease: { position: 'absolute', left: '8%', right: '8%', top: 930, alignItems: 'center', gap: 4, paddingVertical: 16, borderRadius: radii.lg - 2, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.border, backgroundColor: 'rgba(23,20,18,0.6)' },
  teaseTitle: { color: colors.textMuted, fontSize: 15, fontWeight: '800' },
  fadeBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 90 },
});
