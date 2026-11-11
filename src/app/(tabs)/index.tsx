import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { Icon } from '@/components/Icon';
import { Eyebrow, Pill, Screen, TopBar } from '@/components/Screen';
import { WeekStrip } from '@/components/WeekStrip';
import { useProgress } from '@/context/ProgressContext';
import { firstLesson } from '@/data/lesson';
import { colors, displayText, radii, spacing } from '@/theme';

const XP_PER_LEVEL = 100;

export default function HomeScreen() {
  const { lessonCompleted, xp } = useProgress();
  const streak = lessonCompleted ? 1 : 0;

  return (
    <Screen>
      <TopBar showLogo right={<Pill icon="zap" tone="secondary" label={`${streak}`} />} />

      <View style={styles.welcome}>
        <Text style={styles.title}>Cześć, Dawid!</Text>
        <Text style={styles.subtitle}>
          {lessonCompleted
            ? 'Pierwszy dźwięk za Tobą. Wróć, kiedy będziesz gotowy na więcej.'
            : 'Rozgrzej palce. Dziś gramy pierwszą strunę.'}
        </Text>
      </View>

      <LinearGradient colors={['#2C1D12', '#1A130E']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={styles.knobs}>
          {[0, 50, -70].map((rotation) => (
            <View key={rotation} style={[styles.knob, { transform: [{ rotate: `${rotation}deg` }] }]}>
              <View style={styles.knobMark} />
            </View>
          ))}
        </View>
        <View style={styles.heroEyebrow}>
          <View style={styles.led} />
          <Eyebrow color={colors.secondary}>Dzisiejszy set</Eyebrow>
        </View>
        <Text style={styles.heroTitle}>{firstLesson.title}</Text>
        <Text style={styles.heroText}>Jedna struna, cztery spokojne uderzenia.</Text>
        <View style={styles.meta}>
          <Icon name="clock" size={14} color={colors.text} />
          <Text style={styles.metaText}>{firstLesson.minutes} min</Text>
          <Text style={styles.metaDot}>•</Text>
          <Icon name="zap" size={14} color={colors.text} />
          <Text style={styles.metaText}>+{firstLesson.xp} XP</Text>
        </View>
        <AppButton
          label={lessonCompleted ? 'Zagraj jeszcze raz' : 'Zacznij lekcję'}
          icon={lessonCompleted ? 'rotate-ccw' : 'play'}
          onPress={() => router.push('/lesson')}
        />
      </LinearGradient>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Eyebrow>Poziom</Eyebrow>
            <Text style={styles.levelTitle}>1 Garażowiec</Text>
          </View>
          <Pill icon="zap" label={`${xp} XP`} />
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${Math.max(6, (xp / XP_PER_LEVEL) * 100)}%` }]} />
        </View>
        <Text style={styles.cardNote}>
          Jeszcze <Text style={styles.bold}>{XP_PER_LEVEL - xp} XP</Text> do poziomu 2
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Eyebrow>Ten tydzień</Eyebrow>
          <Text style={styles.cardNote}>{lessonCompleted ? '1 sesja' : 'Zacznij dziś'}</Text>
        </View>
        <WeekStrip todayDone={lessonCompleted} />
        <Text style={styles.cardNote}>Opuszczony dzień niczego nie kasuje. Wracasz, kiedy chcesz.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  welcome: { gap: spacing.xs, paddingBottom: spacing.xs },
  title: { ...displayText, color: colors.text, fontSize: 46, lineHeight: 48 },
  subtitle: { color: colors.textMuted, fontSize: 16, lineHeight: 23 },
  hero: {
    overflow: 'hidden',
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: '#5A3A1C',
    padding: spacing.lg - 2,
    gap: spacing.sm,
  },
  knobs: { position: 'absolute', top: 18, right: 18, flexDirection: 'row', gap: 10 },
  knob: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#262626', borderWidth: 2, borderColor: '#3A3A3A', alignItems: 'center' },
  knobMark: { width: 3, height: 10, marginTop: 3, borderRadius: 2, backgroundColor: colors.secondary },
  heroEyebrow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  led: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.primary, shadowColor: colors.primary, shadowOpacity: 1, shadowRadius: 8 },
  heroTitle: { ...displayText, color: colors.text, fontSize: 42, lineHeight: 42, maxWidth: 320 },
  heroText: { color: colors.textMuted, fontSize: 15, lineHeight: 22, maxWidth: 280 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.xs },
  metaText: { color: colors.text, fontSize: 13, fontWeight: '700' },
  metaDot: { color: colors.textMuted },
  card: { borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, padding: spacing.lg - 4, gap: spacing.md - 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  levelTitle: { ...displayText, color: colors.text, fontSize: 30, marginTop: 2 },
  track: { height: 8, borderRadius: radii.pill, backgroundColor: colors.border, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radii.pill, backgroundColor: colors.primary },
  cardNote: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  bold: { color: colors.text, fontWeight: '800' },
});
