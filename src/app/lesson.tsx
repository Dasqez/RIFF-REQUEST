import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { Fretboard } from '@/components/Fretboard';
import { Icon } from '@/components/Icon';
import { Metronome } from '@/components/Metronome';
import { Eyebrow, Screen } from '@/components/Screen';
import { TabStrip } from '@/components/TabStrip';
import { useProgress } from '@/context/ProgressContext';
import { firstLesson } from '@/data/lesson';
import { colors, displayText, radii, spacing } from '@/theme';

const REPEATS = 4;
const lastStep = firstLesson.steps.length - 1;

export default function LessonScreen() {
  const { profile, completeLesson } = useProgress();
  const [step, setStep] = useState(0);
  const [played, setPlayed] = useState(0);
  const [leftHanded, setLeftHanded] = useState(profile?.hand === 'left');
  const [beat, setBeat] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const current = firstLesson.steps[step];
  const counting = step === lastStep;
  const finished = counting && played >= REPEATS;

  function buttonLabel() {
    if (!counting) {
      return 'Rozumiem';
    }

    if (finished) {
      return isSaving ? 'Zapisywanie…' : 'Gotowe, dalej';
    }

    return played === 0 ? 'Zagrałem dźwięk' : `Zagrałem dźwięk (${played}/${REPEATS})`;
  }

  async function finishLesson() {
    setIsSaving(true);
    setSaveError(null);

    try {
      await completeLesson();
      router.replace('/complete');
    } catch (error) {
      console.error('Nie udało się zapisać ukończenia lekcji.', error);
      setSaveError('Nie udało się zapisać postępu. Spróbuj ponownie.');
      setIsSaving(false);
    }
  }

  function handleNext() {
    if (!counting) {
      setStep(step + 1);
    } else if (finished) {
      void finishLesson();
    } else {
      setPlayed(played + 1);
    }
  }

  return (
    <Screen scroll bottomPadding={spacing.lg}>
      <View style={styles.top}>
        <Pressable accessibilityRole="button" accessibilityLabel="Zamknij lekcję" onPress={() => router.back()} style={styles.close}>
          <Icon name="x" size={22} color={colors.text} />
        </Pressable>
        <View style={styles.dots}>
          {firstLesson.steps.map((item, index) => (
            <View key={item.title} style={[styles.dot, index <= step && styles.dotOn]} />
          ))}
        </View>
        <Text style={styles.count}>{step + 1} / {firstLesson.steps.length}</Text>
      </View>

      <View style={styles.copy}>
        <Eyebrow color={colors.secondary}>{`Krok ${step + 1}`}</Eyebrow>
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.description}>{current.description}</Text>
      </View>

      <Fretboard leftHanded={leftHanded} />

      <View accessibilityRole="radiogroup" style={styles.segment}>
        {[false, true].map((left) => (
          <Pressable
            key={String(left)}
            accessibilityRole="radio"
            accessibilityState={{ selected: leftHanded === left }}
            onPress={() => setLeftHanded(left)}
            style={[styles.segmentItem, leftHanded === left && styles.segmentOn]}
          >
            <Text style={[styles.segmentText, leftHanded === left && styles.segmentTextOn]}>
              {left ? 'Leworęczny' : 'Praworęczny'}
            </Text>
          </Pressable>
        ))}
      </View>

      {current.showTab && (
        <>
          <TabStrip activeNote={counting ? Math.min(played, REPEATS) - 1 : (beat ?? -1)} />
          <Metronome onBeat={setBeat} />
        </>
      )}

      {counting && (
        <View style={styles.counter}>
          {Array.from({ length: REPEATS }, (_, index) => (
            <View key={index} style={[styles.circle, index < played && styles.circleOn]}>
              {index < played && <Icon name="check" size={22} color={colors.black} />}
            </View>
          ))}
        </View>
      )}

      {saveError && (
        <Text accessibilityRole="alert" style={styles.error}>{saveError}</Text>
      )}
      <AppButton label={buttonLabel()} icon="chevron-right" disabled={isSaving} onPress={handleNext} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 2 },
  close: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  dots: { flex: 1, flexDirection: 'row', gap: 6 },
  dot: { flex: 1, height: 6, borderRadius: 9, backgroundColor: colors.border },
  dotOn: { backgroundColor: colors.primary },
  count: { color: colors.textMuted, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  copy: { gap: 4 },
  title: { ...displayText, color: colors.text, fontSize: 40, lineHeight: 41 },
  description: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
  segment: { flexDirection: 'row', padding: 4, borderRadius: radii.sm + 2, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceRaised },
  segmentItem: { flex: 1, minHeight: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
  segmentOn: { backgroundColor: colors.primary },
  segmentText: { color: colors.textMuted, fontWeight: '700' },
  segmentTextOn: { color: colors.black },
  counter: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  circle: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  circleOn: { borderStyle: 'solid', borderColor: colors.primary, backgroundColor: colors.primary },
  error: { color: '#FFD2D2', textAlign: 'center', fontSize: 13 },
});
