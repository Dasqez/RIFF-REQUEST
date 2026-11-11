import { Redirect, Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Icon, IconName } from '@/components/Icon';
import { useProgress } from '@/context/ProgressContext';
import { colors } from '@/theme';

const tabs: { name: string; title: string; icon: IconName }[] = [
  { name: 'index', title: 'Start', icon: 'home' },
  { name: 'trasa', title: 'Trasa', icon: 'map' },
  { name: 'stroik', title: 'Stroik', icon: 'activity' },
  { name: 'profil', title: 'Profil', icon: 'user' },
];

export default function TabsLayout() {
  const { profile } = useProgress();

  if (!profile) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.tabLabel,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => <Icon name={tab.icon} size={21} color={typeof color === 'string' ? color : colors.primary} />,
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    height: 68,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 26,
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(23,20,18,0.96)',
    elevation: 8,
  },
  tabItem: { paddingVertical: 8, borderRadius: 18 },
  tabLabel: { fontSize: 11, fontWeight: '700' },
});
