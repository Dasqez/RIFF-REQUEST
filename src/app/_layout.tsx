import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { ProgressProvider, useProgress } from '@/context/ProgressContext';
import { colors, spacing } from '@/theme';

function AppContent() {
  const { isProgressReady, progressLoadError, retryProgressLoad } = useProgress();

  if (progressLoadError) {
    return (
      <View style={styles.stateScreen}>
        <Text style={styles.stateTitle}>Nie udało się wczytać postępu</Text>
        <Text style={styles.stateDescription}>
          Twoje dane nie zostały zmienione. Sprawdź pamięć urządzenia i spróbuj ponownie.
        </Text>
        <AppButton label="Spróbuj ponownie" icon="↻" onPress={retryProgressLoad} />
      </View>
    );
  }

  if (!isProgressReady) {
    return (
      <View accessibilityLabel="Wczytywanie zapisanego postępu" style={styles.stateScreen}>
        <ActivityIndicator color={colors.accent} size="large" />
        <Text style={styles.stateDescription}>Wczytywanie postępu…</Text>
      </View>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ProgressProvider>
        <StatusBar style="light" />
        <AppContent />
      </ProgressProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  stateScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  stateTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  stateDescription: {
    maxWidth: 420,
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
