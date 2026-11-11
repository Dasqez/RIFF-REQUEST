import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/Icon';
import { colors, displayText, radii, spacing } from '@/theme';

type ScreenProps = PropsWithChildren<{
  bottomPadding?: number;
  scroll?: boolean;
}>;

export function Screen({ children, bottomPadding = 120, scroll = true }: ScreenProps) {
  const body = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.scroll, { paddingBottom: bottomPadding }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.page}>{children}</View>
    </ScrollView>
  ) : (
    <View style={[styles.scroll, { paddingBottom: bottomPadding }]}>
      <View style={[styles.page, styles.fill]}>{children}</View>
    </View>
  );

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['rgba(255,106,26,0.18)', 'rgba(255,106,26,0)']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.2, y: 0.5 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <SafeAreaView style={styles.fill} edges={['top', 'left', 'right']}>
        {body}
      </SafeAreaView>
    </View>
  );
}

type TopBarProps = { title?: string; right?: ReactNode; showLogo?: boolean };

export function TopBar({ title = 'RIFF QUEST', right, showLogo }: TopBarProps) {
  return (
    <View style={styles.topBar}>
      {showLogo && (
        <View style={styles.logo}>
          <Icon name="zap" size={22} color={colors.black} />
        </View>
      )}
      <Text style={styles.brand}>{title}</Text>
      {right}
    </View>
  );
}

type PillProps = { icon: 'zap' | 'award'; label: string; tone?: 'primary' | 'secondary' };

export function Pill({ icon, label, tone = 'primary' }: PillProps) {
  const color = tone === 'primary' ? colors.primary : colors.secondary;

  return (
    <View style={[styles.pill, { borderColor: tone === 'primary' ? '#5A2A10' : '#4A3714' }]}>
      <Icon name={icon} size={14} color={color} />
      <Text style={[styles.pillText, { color }]}>{label}</Text>
    </View>
  );
}

export function Eyebrow({ children, color = colors.textMuted }: PropsWithChildren<{ color?: string }>) {
  return <Text style={[styles.eyebrow, { color }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  fill: { flex: 1 },
  scroll: { flexGrow: 1, alignItems: 'center' },
  page: { width: '100%', maxWidth: 560, paddingHorizontal: spacing.lg - 4, gap: spacing.md },
  topBar: { minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  brand: { ...displayText, flex: 1, color: colors.text, fontSize: 26, letterSpacing: 0.6 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  pillText: { fontSize: 13, fontWeight: '800' },
  eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1.6, textTransform: 'uppercase' },
});
