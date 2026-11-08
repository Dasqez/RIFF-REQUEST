import { StyleSheet, Text, View } from 'react-native';

import { strings } from '@/data/lesson';
import { colors, radii, spacing } from '@/theme';

export function Tablature() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Zagraj cztery razy</Text>
      <Text style={styles.hint}>0 oznacza pustą strunę — nie naciskaj żadnego progu.</Text>
      <View accessibilityLabel="Tabulatura: cztery puste dźwięki na niskiej strunie E" style={styles.tab}>
        {strings.map((label, index) => {
          const active = index === strings.length - 1;
          return (
            <View key={`${label}-${index}`} style={styles.row}>
              <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
              <View style={[styles.line, active && styles.activeLine]} />
              {active && (
                <View style={styles.notes}>
                  {['0', '0', '0', '0'].map((note, noteIndex) => (
                    <Text key={`${note}-${noteIndex}`} style={styles.note}>{note}</Text>
                  ))}
                </View>
              )}
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
    gap: spacing.xs,
  },
  title: { color: colors.text, fontSize: 18, fontWeight: '800' },
  hint: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  tab: { marginTop: spacing.sm, paddingVertical: spacing.sm, gap: 7 },
  row: { height: 24, flexDirection: 'row', alignItems: 'center' },
  label: { width: 26, color: colors.textMuted, fontSize: 14, fontWeight: '700' },
  activeLabel: { color: colors.accent },
  line: { flex: 1, height: 1, backgroundColor: '#626A65' },
  activeLine: { height: 2, backgroundColor: colors.accent },
  notes: { position: 'absolute', left: 42, right: 10, flexDirection: 'row', justifyContent: 'space-around' },
  note: {
    minWidth: 24,
    backgroundColor: colors.surface,
    color: colors.accent,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '900',
  },
});
