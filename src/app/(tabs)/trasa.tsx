import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LessonSheet } from '@/components/LessonSheet';
import { Eyebrow, Pill, Screen, TopBar } from '@/components/Screen';
import { NodeStatus, TrailMap } from '@/components/TrailMap';
import { useProgress } from '@/context/ProgressContext';
import { trailLessons } from '@/data/lesson';
import { colors, displayText, radii, spacing } from '@/theme';

type Selected = { index: number; status: NodeStatus } | null;

export default function TrailScreen() {
  const { lessonCompleted, xp } = useProgress();
  const [selected, setSelected] = useState<Selected>(null);
  const lesson = selected ? trailLessons[selected.index] : null;
  const progress = lessonCompleted ? 20 : 3;

  function describe() {
    if (!selected || !lesson) {
      return { description: '', actionLabel: 'Zamknij', onAction: () => setSelected(null) };
    }

    if (selected.status === 'locked') {
      return {
        description: 'Odblokuje się po ukończeniu poprzedniej lekcji. Idź swoim tempem.',
        actionLabel: 'Rozumiem',
        onAction: () => setSelected(null),
      };
    }

    if (selected.index === 0) {
      return {
        description: `Poznaj pustą strunę E i zagraj cztery równe dźwięki. Czas: ${lesson.minutes} min. Nagroda: ${lesson.xp} XP.`,
        actionLabel: selected.status === 'done' ? 'Zagraj jeszcze raz' : 'Zacznij lekcję',
        onAction: () => {
          setSelected(null);
          router.push('/lesson');
        },
      };
    }

    return {
      description: 'Ta lekcja pojawi się w kolejnej wersji aplikacji.',
      actionLabel: 'Zamknij',
      onAction: () => setSelected(null),
    };
  }

  const sheet = describe();

  return (
    <Screen bottomPadding={110}>
      <TopBar title="TRASA" right={<Pill icon="zap" label={`${xp} XP`} />} />
      <View style={styles.chapter}>
        <Eyebrow color={colors.secondary}>Rozdział 1</Eyebrow>
        <Text style={styles.title}>Pierwsze struny</Text>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress}%` }]} />
        </View>
      </View>
      <TrailMap lessonCompleted={lessonCompleted} onSelect={(index, status) => setSelected({ index, status })} />
      <LessonSheet
        visible={selected !== null}
        eyebrow={selected && lesson?.boss ? 'Boss rozdziału' : `Lekcja ${(selected?.index ?? 0) + 1}`}
        title={lesson?.title ?? ''}
        description={sheet.description}
        actionLabel={sheet.actionLabel}
        onAction={sheet.onAction}
        onClose={() => setSelected(null)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  chapter: { gap: spacing.xs + 2, marginBottom: -spacing.md },
  title: { ...displayText, color: colors.text, fontSize: 36, lineHeight: 38 },
  track: { height: 8, marginTop: spacing.xs, borderRadius: radii.pill, backgroundColor: colors.border, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radii.pill, backgroundColor: colors.primary },
});
