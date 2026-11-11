import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { Icon } from '@/components/Icon';
import { Eyebrow, Screen } from '@/components/Screen';
import { firstLesson, trailLessons } from '@/data/lesson';
import { colors, displayText, radii, spacing } from '@/theme';

const stats = [
  { value: '4', label: 'dźwięki' },
  { value: '1', label: 'dzień z rzędu' },
  { value: `1/${trailLessons.length}`, label: 'lekcji' },
];

export default function CompleteScreen() {
  return (
    <Screen scroll={false} bottomPadding={spacing.lg}>
      <View style={styles.center}>
        <View style={styles.burst}>
          <View style={styles.badge}>
            <Icon name="zap" size={64} color={colors.secondary} />
          </View>
        </View>
        <Eyebrow color={colors.secondary}>Lekcja ukończona</Eyebrow>
        <Text style={styles.title}>Pierwszy dźwięk za Tobą</Text>
        <Text style={styles.xp}>+{firstLesson.xp} XP</Text>
      </View>

      <View style={styles.stats}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.stat}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.next}>
        <View style={styles.nextIcon}>
          <Icon name="minus" size={22} color={colors.accent} />
        </View>
        <View style={styles.nextCopy}>
          <Eyebrow>Następna lekcja</Eyebrow>
          <Text style={styles.nextTitle}>{trailLessons[1].title}</Text>
        </View>
        <Icon name="chevron-right" size={22} color={colors.textMuted} />
      </View>

      <View style={styles.actions}>
        <AppButton label="Wróć na trasę" onPress={() => router.replace('/trasa')} />
        <AppButton label="Ekran startowy" variant="secondary" onPress={() => router.replace('/')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.xs + 2 },
  burst: { width: 176, height: 176, marginBottom: spacing.sm, alignItems: 'center', justifyContent: 'center', borderRadius: 88, backgroundColor: 'rgba(255,106,26,0.18)' },
  badge: { width: 140, height: 140, borderRadius: 70, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.secondary, backgroundColor: colors.surface, shadowColor: colors.primary, shadowOpacity: 0.7, shadowRadius: 24 },
  title: { ...displayText, color: colors.text, fontSize: 46, lineHeight: 47, textAlign: 'center' },
  xp: { ...displayText, color: colors.secondary, fontSize: 58, lineHeight: 62 },
  stats: { flexDirection: 'row', gap: spacing.sm },
  stat: { flex: 1, alignItems: 'center', paddingVertical: 14, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  statValue: { ...displayText, color: colors.text, fontSize: 30 },
  statLabel: { color: colors.textMuted, fontSize: 12 },
  next: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  nextIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceRaised },
  nextCopy: { flex: 1, gap: 2 },
  nextTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  actions: { gap: spacing.sm + 2 },
});
