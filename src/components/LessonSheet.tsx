import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { Eyebrow } from '@/components/Screen';
import { colors, displayText, spacing } from '@/theme';

type LessonSheetProps = {
  visible: boolean;
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  onClose: () => void;
};

export function LessonSheet({
  visible,
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
  onClose,
}: LessonSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable accessibilityLabel="Zamknij" style={styles.scrim} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.grab} />
        <Eyebrow color={colors.secondary}>{eyebrow}</Eyebrow>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <AppButton label={actionLabel} onPress={onAction} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg - 4,
    paddingTop: spacing.md - 2,
    paddingBottom: spacing.xl,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderColor: '#5A3A1C',
    backgroundColor: colors.surface,
  },
  grab: { alignSelf: 'center', width: 44, height: 5, borderRadius: 9, marginBottom: spacing.sm, backgroundColor: colors.border },
  title: { ...displayText, color: colors.text, fontSize: 38, lineHeight: 40 },
  description: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginBottom: spacing.sm },
});
