import { StyleSheet, Text, View } from 'react-native';

import { Icon, IconName } from '@/components/Icon';
import { Eyebrow, Screen, TopBar } from '@/components/Screen';
import { useProgress } from '@/context/ProgressContext';
import { colors, displayText, radii, spacing } from '@/theme';

const gearLabels = { electric: 'Gitara elektryczna', acoustic: 'Gitara akustyczna', none: 'Jeszcze bez gitary' } as const;

type Badge = { title: string; icon: IconName; unlocked: boolean };

export default function ProfileScreen() {
  const { profile, lessonCompleted, xp } = useProgress();
  const badges: Badge[] = [
    { title: 'Pierwszy dźwięk', icon: 'zap', unlocked: lessonCompleted },
    { title: 'Pięć dni', icon: 'lock', unlocked: false },
    { title: 'Pierwszy riff', icon: 'lock', unlocked: false },
  ];
  const rows = [
    { label: 'Sprzęt', value: profile ? gearLabels[profile.gear] : '' },
    { label: 'Ręka', value: profile?.hand === 'left' ? 'Leworęczny' : 'Praworęczny' },
    { label: 'Czas dziennie', value: `${profile?.minutes ?? 15} minut` },
    { label: 'Style', value: profile && profile.genres.length > 0 ? profile.genres.join(', ') : 'Jeszcze nie wybrano' },
  ];
  const stats = [
    { value: xp, label: 'XP' },
    { value: lessonCompleted ? 1 : 0, label: 'dni z rzędu' },
    { value: lessonCompleted ? 4 : 0, label: 'minut' },
  ];

  return (
    <Screen>
      <TopBar title="PROFIL" />

      <View style={styles.head}>
        <View style={styles.avatar}>
          <Icon name="user" size={34} color={colors.black} />
        </View>
        <View style={styles.headCopy}>
          <Text style={styles.name}>Dawid</Text>
          <Text style={styles.level}>Poziom 1 Garażowiec</Text>
        </View>
      </View>

      <View style={styles.stats}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.stat}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <Eyebrow>Osiągnięcia</Eyebrow>
      <View style={styles.badges}>
        {badges.map((badge) => (
          <View key={badge.title} style={styles.badge}>
            <View style={[styles.badgeIcon, !badge.unlocked && styles.badgeIconLocked]}>
              <Icon name={badge.icon} size={22} color={badge.unlocked ? colors.black : colors.textMuted} />
            </View>
            <Text style={[styles.badgeText, !badge.unlocked && { color: colors.textMuted }]}>{badge.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.rows}>
        {rows.map((row, index) => (
          <View key={row.label} style={[styles.row, index === rows.length - 1 && styles.rowLast]}>
            <Text style={styles.rowLabel}>{row.label}</Text>
            <Text style={styles.rowValue}>{row.value}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg - 4, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  avatar: { width: 72, height: 72, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary },
  headCopy: { flex: 1 },
  name: { ...displayText, color: colors.text, fontSize: 32 },
  level: { color: colors.textMuted, fontSize: 14 },
  stats: { flexDirection: 'row', gap: spacing.sm },
  stat: { flex: 1, alignItems: 'center', paddingVertical: 14, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  statValue: { ...displayText, color: colors.text, fontSize: 30 },
  statLabel: { color: colors.textMuted, fontSize: 12 },
  badges: { flexDirection: 'row', gap: spacing.sm },
  badge: { flex: 1, alignItems: 'center', gap: 8, paddingVertical: spacing.md, paddingHorizontal: 6, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  badgeIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary },
  badgeIconLocked: { backgroundColor: colors.surfaceRaised, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.border },
  badgeText: { color: colors.text, fontSize: 12, fontWeight: '700', textAlign: 'center' },
  rows: { paddingHorizontal: spacing.lg - 4, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowLast: { borderBottomWidth: 0 },
  rowLabel: { color: colors.textMuted, fontSize: 14 },
  rowValue: { flex: 1, color: colors.text, fontSize: 14, fontWeight: '700', textAlign: 'right' },
});
