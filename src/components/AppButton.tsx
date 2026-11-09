import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors, radii, spacing } from '@/theme';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  icon?: string;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  disabled?: boolean;
};

export function AppButton({
  label,
  onPress,
  icon = '▶︎',
  variant = 'primary',
  style,
  disabled = false,
}: AppButtonProps) {
  const secondary = variant === 'secondary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.secondaryButton,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.icon, secondary && styles.secondaryText]}>{icon}</Text>
      <Text style={[styles.label, secondary && styles.secondaryText]}>{label}</Text>
      {!secondary && <Text style={styles.arrow}>›</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 58,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  secondaryButton: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
  disabled: { opacity: 0.55 },
  icon: { color: colors.black, fontSize: 18, fontWeight: '900' },
  label: { color: colors.black, fontSize: 17, fontWeight: '800' },
  secondaryText: { color: colors.text },
  arrow: {
    position: 'absolute',
    right: spacing.lg,
    color: colors.black,
    fontSize: 32,
    fontWeight: '500',
    marginTop: -3,
  },
});
