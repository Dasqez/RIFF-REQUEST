import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon, IconName } from '@/components/Icon';
import { colors, radii, spacing } from '@/theme';

type ChoiceCardProps = {
  title: string;
  description: string;
  icon: IconName;
  selected: boolean;
  onPress: () => void;
};

export function ChoiceCard({ title, description, icon, selected, onPress }: ChoiceCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.card, selected && styles.selected, pressed && styles.pressed]}
    >
      <View style={[styles.icon, selected && styles.iconSelected]}>
        <Icon name={icon} size={22} color={selected ? colors.black : colors.accent} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  selected: { borderColor: colors.primary, backgroundColor: colors.primarySurface },
  pressed: { transform: [{ scale: 0.98 }] },
  icon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceRaised },
  iconSelected: { backgroundColor: colors.primary },
  copy: { flex: 1, gap: 2 },
  title: { color: colors.text, fontSize: 16, fontWeight: '800' },
  description: { color: colors.textMuted, fontSize: 13 },
});
