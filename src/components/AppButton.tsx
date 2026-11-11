import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Icon, IconName } from '@/components/Icon';
import { colors, radii, spacing } from '@/theme';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  icon?: IconName;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  disabled?: boolean;
};

export function AppButton({
  label,
  onPress,
  icon,
  variant = 'primary',
  style,
  disabled = false,
}: AppButtonProps) {
  const secondary = variant === 'secondary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary ? styles.secondary : styles.primary,
        pressed && (secondary ? styles.pressedSecondary : styles.pressedPrimary),
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.content}>
        {icon && <Icon name={icon} size={20} color={secondary ? colors.text : colors.black} />}
        <Text style={[styles.label, secondary && styles.secondaryLabel]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 58,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
    borderBottomWidth: 5,
    borderBottomColor: colors.primaryDark,
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  secondary: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressedPrimary: { borderBottomWidth: 2, transform: [{ translateY: 3 }] },
  pressedSecondary: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.55 },
  content: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  label: { color: colors.black, fontSize: 16, fontWeight: '800' },
  secondaryLabel: { color: colors.text },
});
