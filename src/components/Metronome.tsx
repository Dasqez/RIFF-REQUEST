import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { colors, displayText, radii, spacing } from '@/theme';

const MIN_BPM = 40;
const MAX_BPM = 120;

type MetronomeProps = { onBeat: (beat: number | null) => void };

export function Metronome({ onBeat }: MetronomeProps) {
  const [running, setRunning] = useState(false);
  const [bpm, setBpm] = useState(60);
  const [beat, setBeat] = useState(-1);

  useEffect(() => {
    if (!running) {
      return undefined;
    }

    let current = -1;
    const tick = () => {
      current = (current + 1) % 4;
      setBeat(current);
      onBeat(current);
    };

    tick();
    const timer = setInterval(tick, 60000 / bpm);

    return () => clearInterval(timer);
  }, [bpm, onBeat, running]);

  function toggleRunning() {
    if (running) {
      setBeat(-1);
      onBeat(null);
    }

    setRunning(!running);
  }

  function changeBpm(delta: number) {
    setBpm((value) => Math.min(MAX_BPM, Math.max(MIN_BPM, value + delta)));
  }

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={running ? 'Zatrzymaj metronom' : 'Włącz metronom'}
          onPress={toggleRunning}
          style={styles.play}
        >
          <Icon name={running ? 'pause' : 'play'} size={20} color={colors.text} />
        </Pressable>
        <View style={styles.beats}>
          {[0, 1, 2, 3].map((index) => (
            <View key={index} style={[styles.beat, index === beat && styles.beatHit]} />
          ))}
        </View>
      </View>
      <View style={styles.bpm}>
        <Pressable accessibilityRole="button" accessibilityLabel="Wolniej" onPress={() => changeBpm(-5)} style={styles.step}>
          <Icon name="minus" size={18} color={colors.text} />
        </Pressable>
        <Text accessibilityLabel={`${bpm} uderzeń na minutę`} style={styles.value}>{bpm}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Szybciej" onPress={() => changeBpm(5)} style={styles.step}>
          <Icon name="plus" size={18} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  play: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.border },
  beats: { flexDirection: 'row', gap: 8 },
  beat: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.border },
  beatHit: { backgroundColor: colors.primary, shadowColor: colors.primary, shadowOpacity: 1, shadowRadius: 8, transform: [{ scale: 1.25 }] },
  bpm: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  step: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.border },
  value: { ...displayText, minWidth: 54, textAlign: 'center', color: colors.text, fontSize: 34 },
});
