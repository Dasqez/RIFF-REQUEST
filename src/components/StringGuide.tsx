import { StyleSheet, Text, View } from 'react-native';

import { strings } from '@/data/lesson';
import { colors, radii, spacing } from '@/theme';

export function StringGuide() {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Sześć strun gitary</Text>
        <View style={styles.badge}><Text style={styles.badgeText}>GRAJ TĘ</Text></View>
      </View>
      <Text style={styles.hint}>Najcieńsza na górze, najgrubsza na dole.</Text>
      <View style={styles.strings}>
        {strings.map((label, index) => {
          const active = label === 'E';
          return (
            <View key={`${label}-${index}`} style={[styles.stringRow, active && styles.activeRow]}>
              <Text style={[styles.stringLabel, active && styles.activeText]}>{label}</Text>
              <View style={[styles.stringLine, { height: 1 + index * 0.55 }, active && styles.activeLine]} />
              {active && <Text style={styles.pick}>●</Text>}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.sm,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  title: { color: colors.text, fontSize: 18, fontWeight: '800' },
  hint: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  badge: { backgroundColor: colors.accentMuted, borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 5 },
  badgeText: { color: colors.accent, fontSize: 10, fontWeight: '900', letterSpacing: 0.8 },
  strings: { gap: spacing.xs, marginTop: spacing.xs },
  stringRow: { minHeight: 28, flexDirection: 'row', alignItems: 'center', borderRadius: radii.sm, paddingHorizontal: spacing.sm },
  activeRow: { backgroundColor: colors.accentMuted },
  stringLabel: { width: 26, color: colors.textMuted, fontSize: 15, fontWeight: '800' },
  activeText: { color: colors.accent },
  stringLine: { flex: 1, backgroundColor: '#778078' },
  activeLine: { backgroundColor: colors.accent, shadowColor: colors.accent, shadowOpacity: 0.75, shadowRadius: 6 },
  pick: { width: 28, textAlign: 'right', color: colors.accent, fontSize: 15 },
});
