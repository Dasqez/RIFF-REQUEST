import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { StringGuide } from '@/components/StringGuide';
import { Tablature } from '@/components/Tablature';
import { useProgress } from '@/context/ProgressContext';
import { firstLesson } from '@/data/lesson';
import { colors, radii, spacing } from '@/theme';

export default function LessonScreen() {
  const { lessonCompleted, completeLesson } = useProgress();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleCompleteLesson() {
    setIsSaving(true);
    setSaveError(null);

    try {
      await completeLesson();
    } catch (error) {
      console.error('Nie udało się zapisać ukończenia lekcji.', error);
      setSaveError('Nie udało się zapisać postępu. Spróbuj ponownie.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <View style={styles.topBar}>
            <Pressable
              accessibilityLabel="Wróć na ekran główny"
              accessibilityRole="button"
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>
            <View style={styles.lessonProgress}>
              <Text style={styles.lessonProgressLabel}>{firstLesson.eyebrow}</Text>
              <View style={styles.progressTrack}><View style={styles.progressFill} /></View>
            </View>
            <View style={styles.topSpacer} />
          </View>

          <View style={styles.intro}>
            <Text style={styles.title}>{firstLesson.title}</Text>
            <Text style={styles.goal}>{firstLesson.goal}</Text>
          </View>

          <View style={styles.definitionCard}>
            <View style={styles.definitionIcon}><Text style={styles.definitionIconText}>E</Text></View>
            <View style={styles.definitionCopy}>
              <Text style={styles.definitionTitle}>Co to jest pusta struna?</Text>
              <Text style={styles.definitionText}>
                To struna zagrana bez naciskania żadnego progu. Jej dźwięk może swobodnie wybrzmieć.
              </Text>
            </View>
          </View>

          <StringGuide />

          <View style={styles.stepsSection}>
            <Text style={styles.sectionTitle}>Zrób to krok po kroku</Text>
            {firstLesson.steps.map((step, index) => (
              <View key={step.title} style={styles.stepCard}>
                <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{index + 1}</Text></View>
                <View style={styles.stepCopy}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <Tablature />

          {lessonCompleted ? (
            <View style={styles.successCard}>
              <View style={styles.successIcon}><Text style={styles.successIconText}>✓</Text></View>
              <View style={styles.successCopy}>
                <Text style={styles.successTitle}>Pierwszy dźwięk zaliczony!</Text>
                <Text style={styles.successText}>Postęp jest już widoczny na ekranie głównym.</Text>
              </View>
            </View>
          ) : (
            <View style={styles.readyNote}>
              <Text style={styles.readyNoteText}>
                Gotowe? Zaznacz ukończenie dopiero po czterech spokojnych powtórzeniach.
              </Text>
            </View>
          )}

          {saveError && (
            <View accessibilityRole="alert" style={styles.errorCard}>
              <Text style={styles.errorText}>{saveError}</Text>
            </View>
          )}

          <AppButton
            label={lessonCompleted ? 'Wróć na start' : isSaving ? 'Zapisywanie…' : 'Ukończyłem ćwiczenie'}
            icon={lessonCompleted ? '⌂' : isSaving ? '…' : '✓'}
            disabled={isSaving}
            onPress={() => {
              if (lessonCompleted) {
                router.replace('/');
              } else {
                void handleCompleteLesson();
              }
            }}
          />
          {!lessonCompleted && (
            <AppButton label="Wróć bez kończenia" icon="‹" variant="secondary" onPress={() => router.back()} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, alignItems: 'center', paddingBottom: spacing.xl },
  page: { width: '100%', maxWidth: 560, paddingHorizontal: spacing.md, gap: spacing.md },
  topBar: { minHeight: 64, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  backButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  backIcon: { color: colors.text, fontSize: 36, lineHeight: 38, marginTop: -4 },
  lessonProgress: { flex: 1, gap: 7 },
  lessonProgressLabel: { color: colors.textMuted, textAlign: 'center', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  progressTrack: { height: 5, borderRadius: radii.pill, backgroundColor: colors.border, overflow: 'hidden' },
  progressFill: { width: '100%', height: '100%', backgroundColor: colors.accent },
  topSpacer: { width: 44 },
  intro: { paddingVertical: spacing.sm, gap: spacing.xs },
  title: { color: colors.text, fontSize: 36, lineHeight: 41, fontWeight: '900', letterSpacing: -1.2 },
  goal: { color: colors.textMuted, fontSize: 17, lineHeight: 25 },
  definitionCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, borderRadius: radii.lg, borderWidth: 1, borderColor: '#3A4930', backgroundColor: colors.accentMuted, padding: spacing.md },
  definitionIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  definitionIconText: { color: colors.black, fontSize: 22, fontWeight: '900' },
  definitionCopy: { flex: 1, gap: 4 },
  definitionTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  definitionText: { color: '#C8D5C5', fontSize: 13, lineHeight: 19 },
  stepsSection: { gap: spacing.sm },
  sectionTitle: { color: colors.text, fontSize: 20, fontWeight: '900', marginBottom: 2 },
  stepCard: { flexDirection: 'row', gap: spacing.md, borderRadius: radii.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, padding: spacing.md },
  stepNumber: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.accentMuted, alignItems: 'center', justifyContent: 'center' },
  stepNumberText: { color: colors.accent, fontSize: 15, fontWeight: '900' },
  stepCopy: { flex: 1, gap: 4 },
  stepTitle: { color: colors.text, fontSize: 15, fontWeight: '800' },
  stepDescription: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  readyNote: { borderRadius: radii.md, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.border, padding: spacing.md },
  readyNoteText: { color: colors.textMuted, textAlign: 'center', fontSize: 13, lineHeight: 19 },
  errorCard: { borderRadius: radii.md, borderWidth: 1, borderColor: '#8F4A4A', backgroundColor: '#351D1D', padding: spacing.md },
  errorText: { color: '#FFD2D2', textAlign: 'center', fontSize: 13, lineHeight: 19 },
  successCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, borderRadius: radii.lg, borderWidth: 1, borderColor: '#456934', backgroundColor: colors.successSurface, padding: spacing.md },
  successIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.success, alignItems: 'center', justifyContent: 'center' },
  successIconText: { color: colors.black, fontSize: 24, fontWeight: '900' },
  successCopy: { flex: 1, gap: 3 },
  successTitle: { color: colors.text, fontSize: 16, fontWeight: '900' },
  successText: { color: '#C8D5C5', fontSize: 13, lineHeight: 19 },
});
