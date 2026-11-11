import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { ChoiceCard } from '@/components/ChoiceCard';
import { Icon } from '@/components/Icon';
import { Eyebrow, Screen } from '@/components/Screen';
import { useProgress } from '@/context/ProgressContext';
import {
  defaultProfile,
  gearChoices,
  genres,
  handChoices,
  levelChoices,
  minuteChoices,
} from '@/data/onboarding';
import { colors, displayText, radii, spacing } from '@/theme';

const steps = [
  { eyebrow: 'Zacznijmy', title: 'Jak dobrze znasz gitarę?', hint: '' },
  { eyebrow: 'Twój styl', title: 'Co chcesz grać?', hint: 'Wybierz dowolnie wiele. Dopasujemy riffy.' },
  { eyebrow: 'Twój rytm', title: 'Ile czasu masz dziennie?', hint: 'Bez presji. Zmienisz to w każdej chwili.' },
  { eyebrow: 'Ułożenie', title: 'Którą ręką grasz?', hint: 'Ustawimy gryf tak, jak go widzisz.' },
  { eyebrow: 'Ostatni krok', title: 'Masz już gitarę?', hint: 'Dobierzemy wskazówki do Twojego sprzętu.' },
];

export default function OnboardingScreen() {
  const { updateProfile } = useProgress();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(defaultProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const current = steps[step];
  const isLast = step === steps.length - 1;

  function toggleGenre(genre: string) {
    setDraft((previous) => ({
      ...previous,
      genres: previous.genres.includes(genre)
        ? previous.genres.filter((item) => item !== genre)
        : [...previous.genres, genre],
    }));
  }

  async function handleNext() {
    if (!isLast) {
      setStep(step + 1);
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await updateProfile(draft);
      router.replace('/');
    } catch (saveError) {
      console.error('Nie udało się zapisać profilu.', saveError);
      setError('Nie udało się zapisać ustawień. Spróbuj ponownie.');
      setIsSaving(false);
    }
  }

  return (
    <Screen scroll={false} bottomPadding={spacing.lg}>
      <View style={styles.top}>
        <Pressable
          accessibilityLabel="Wstecz"
          accessibilityRole="button"
          disabled={step === 0}
          onPress={() => setStep(step - 1)}
          style={[styles.back, step === 0 && styles.hidden]}
        >
          <Icon name="chevron-left" size={22} color={colors.text} />
        </Pressable>
        <View style={styles.bar}>
          <View style={[styles.barFill, { width: `${((step + 1) / steps.length) * 100}%` }]} />
        </View>
        <Text style={styles.count}>{step + 1} / {steps.length}</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.heading}>
          <Eyebrow>{current.eyebrow}</Eyebrow>
          <Text style={styles.title}>{current.title}</Text>
          {current.hint !== '' && <Text style={styles.hint}>{current.hint}</Text>}
        </View>

        {step === 0 && levelChoices.map((choice) => (
          <ChoiceCard key={choice.value} {...choice} selected={draft.level === choice.value} onPress={() => setDraft({ ...draft, level: choice.value })} />
        ))}
        {step === 1 && (
          <View style={styles.chips}>
            {genres.map((genre) => {
              const selected = draft.genres.includes(genre);

              return (
                <Pressable
                  key={genre}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: selected }}
                  onPress={() => toggleGenre(genre)}
                  style={[styles.chip, selected && styles.chipSelected]}
                >
                  <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{genre}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
        {step === 2 && minuteChoices.map((choice) => (
          <ChoiceCard key={choice.value} {...choice} selected={draft.minutes === choice.value} onPress={() => setDraft({ ...draft, minutes: choice.value })} />
        ))}
        {step === 3 && handChoices.map((choice) => (
          <ChoiceCard key={choice.value} {...choice} selected={draft.hand === choice.value} onPress={() => setDraft({ ...draft, hand: choice.value })} />
        ))}
        {step === 4 && gearChoices.map((choice) => (
          <ChoiceCard key={choice.value} {...choice} selected={draft.gear === choice.value} onPress={() => setDraft({ ...draft, gear: choice.value })} />
        ))}
      </View>

      {error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
      <AppButton
        label={isLast ? 'Zaczynam' : 'Dalej'}
        icon="chevron-right"
        disabled={isSaving}
        onPress={() => void handleNext()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 2 },
  back: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  hidden: { opacity: 0 },
  bar: { flex: 1, height: 8, borderRadius: radii.pill, backgroundColor: colors.border, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: radii.pill, backgroundColor: colors.primary },
  count: { color: colors.textMuted, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  body: { flex: 1, gap: spacing.sm + 2, paddingTop: spacing.sm },
  heading: { gap: 6, marginBottom: spacing.sm },
  title: { ...displayText, color: colors.text, fontSize: 46, lineHeight: 47 },
  hint: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 18, borderRadius: radii.pill, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text, fontSize: 15, fontWeight: '600' },
  chipTextSelected: { color: colors.black },
  error: { color: '#FFD2D2', textAlign: 'center', fontSize: 13 },
});
