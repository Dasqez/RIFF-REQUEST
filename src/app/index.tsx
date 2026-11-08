import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { useProgress } from '@/context/ProgressContext';
import { colors, radii, spacing } from '@/theme';

export default function HomeScreen() {
  const { lessonCompleted } = useProgress();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <View style={styles.brandRow}>
            <View style={styles.logoMark}><Text style={styles.logoBolt}>ϟ</Text></View>
            <Text style={styles.brand}>RIFF QUEST</Text>
            <View style={styles.stagePill}><Text style={styles.stageText}>ETAP 0</Text></View>
          </View>

          <View style={styles.welcome}>
            <Text style={styles.title}>Cześć, Dawid!</Text>
            <Text style={styles.subtitle}>
              Pierwszy dźwięk jest bliżej, niż myślisz. Zaczniemy spokojnie — od jednej struny.
            </Text>
          </View>

          <View style={styles.heroCard}>
            <View style={styles.heroGlow} />
            <Text style={styles.cardEyebrow}>OD ZERA DO GITARZYSTY</Text>
            <Text style={styles.heroTitle}>Twój pierwszy{`\n`}dźwięk</Text>
            <Text style={styles.heroDescription}>
              Poznaj pustą strunę E i zagraj cztery równe dźwięki.
            </Text>
            <View style={styles.lessonMeta}>
              <View style={styles.metaDot} />
              <Text style={styles.metaText}>Lekcja 1</Text>
              <Text style={styles.metaSeparator}>•</Text>
              <Text style={styles.metaText}>około 4 min</Text>
            </View>
            <AppButton
              label={lessonCompleted ? 'Zagraj jeszcze raz' : 'Zacznij naukę'}
              icon={lessonCompleted ? '↻' : '▶︎'}
              onPress={() => router.push('/lesson')}
            />
          </View>

          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View>
                <Text style={styles.sectionLabel}>TWÓJ POSTĘP</Text>
                <Text style={styles.progressTitle}>
                  {lessonCompleted ? 'Pierwsza lekcja ukończona' : 'Pierwsza lekcja czeka'}
                </Text>
              </View>
              <Text style={styles.progressFraction}>{lessonCompleted ? '1 / 1' : '0 / 1'}</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, lessonCompleted && styles.progressFillComplete]} />
            </View>
            <View style={styles.progressStatus}>
              <View style={[styles.statusIcon, lessonCompleted && styles.statusIconComplete]}>
                <Text style={[styles.statusIconText, lessonCompleted && styles.statusIconTextComplete]}>
                  {lessonCompleted ? '✓' : '1'}
                </Text>
              </View>
              <Text style={styles.statusText}>
                {lessonCompleted
                  ? 'Świetnie — umiesz już zagrać pustą strunę E.'
                  : 'Ukończ ćwiczenie, aby zobaczyć tutaj postęp.'}
              </Text>
            </View>
          </View>

          <View style={styles.todayCard}>
            <View style={styles.todayIcon}><Text style={styles.todayIconText}>♪</Text></View>
            <View style={styles.todayCopy}>
              <Text style={styles.sectionLabel}>DZISIAJ</Text>
              <Text style={styles.todayTitle}>Pierwszy dźwięk</Text>
              <Text style={styles.todayDescription}>Jedna struna, cztery spokojne powtórzenia.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, alignItems: 'center', paddingBottom: spacing.xl },
  page: { width: '100%', maxWidth: 560, paddingHorizontal: spacing.md, gap: spacing.md },
  brandRow: { minHeight: 64, flexDirection: 'row', alignItems: 'center' },
  logoMark: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accent },
  logoBolt: { color: colors.black, fontSize: 30, fontWeight: '900', marginTop: -4 },
  brand: { marginLeft: 10, flex: 1, color: colors.text, fontSize: 20, fontWeight: '900', fontStyle: 'italic', letterSpacing: 0.4 },
  stagePill: { borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 10, paddingVertical: 6 },
  stageText: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  welcome: { paddingVertical: spacing.md, gap: spacing.xs },
  title: { color: colors.text, fontSize: 36, lineHeight: 42, fontWeight: '900', letterSpacing: -1.2 },
  subtitle: { maxWidth: 470, color: colors.textMuted, fontSize: 17, lineHeight: 25 },
  heroCard: { overflow: 'hidden', borderRadius: radii.lg, borderWidth: 1, borderColor: '#3A4930', backgroundColor: colors.surfaceRaised, padding: spacing.lg, gap: spacing.md },
  heroGlow: { position: 'absolute', top: -80, right: -60, width: 220, height: 220, borderRadius: 110, backgroundColor: colors.accentMuted, opacity: 0.75 },
  cardEyebrow: { color: colors.accent, fontSize: 12, fontWeight: '900', letterSpacing: 1.2 },
  heroTitle: { color: colors.text, fontSize: 32, lineHeight: 36, fontWeight: '900', letterSpacing: -0.7 },
  heroDescription: { maxWidth: 380, color: colors.textMuted, fontSize: 15, lineHeight: 22 },
  lessonMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metaDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent },
  metaText: { color: colors.text, fontSize: 13, fontWeight: '700' },
  metaSeparator: { color: colors.textMuted },
  progressCard: { borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, padding: spacing.md, gap: spacing.md },
  progressHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.md },
  sectionLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  progressTitle: { marginTop: 4, color: colors.text, fontSize: 17, fontWeight: '800' },
  progressFraction: { color: colors.accent, fontSize: 16, fontWeight: '900' },
  progressTrack: { height: 8, overflow: 'hidden', borderRadius: radii.pill, backgroundColor: colors.border },
  progressFill: { width: '7%', height: '100%', borderRadius: radii.pill, backgroundColor: '#68706B' },
  progressFillComplete: { width: '100%', backgroundColor: colors.accent },
  progressStatus: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  statusIcon: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 17, backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.border },
  statusIconComplete: { backgroundColor: colors.accent },
  statusIconText: { color: colors.textMuted, fontWeight: '900' },
  statusIconTextComplete: { color: colors.black },
  statusText: { flex: 1, color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  todayCard: { borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, padding: spacing.md, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  todayIcon: { width: 50, height: 50, borderRadius: 16, backgroundColor: colors.accentMuted, alignItems: 'center', justifyContent: 'center' },
  todayIconText: { color: colors.accent, fontSize: 26, fontWeight: '900' },
  todayCopy: { flex: 1, gap: 2 },
  todayTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  todayDescription: { color: colors.textMuted, fontSize: 13, lineHeight: 18 },
});
