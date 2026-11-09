import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { loadLessonCompleted, saveLessonCompleted } from '@/storage/progressStorage';

type ProgressContextValue = {
  lessonCompleted: boolean;
  isProgressReady: boolean;
  progressLoadError: string | null;
  completeLesson: () => Promise<void>;
  retryProgressLoad: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: PropsWithChildren) {
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [isProgressReady, setIsProgressReady] = useState(false);
  const [progressLoadError, setProgressLoadError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    let isActive = true;

    async function hydrateProgress() {
      setIsProgressReady(false);
      setProgressLoadError(null);

      try {
        const completed = await loadLessonCompleted();

        if (isActive) {
          setLessonCompleted(completed);
          setIsProgressReady(true);
        }
      } catch (error) {
        console.error('Nie udało się wczytać postępu.', error);

        if (isActive) {
          setProgressLoadError('Nie udało się bezpiecznie wczytać zapisanego postępu.');
        }
      }
    }

    void hydrateProgress();

    return () => {
      isActive = false;
    };
  }, [loadAttempt]);

  const completeLesson = useCallback(async () => {
    await saveLessonCompleted();
    setLessonCompleted(true);
  }, []);

  const retryProgressLoad = useCallback(() => {
    setLoadAttempt((attempt) => attempt + 1);
  }, []);

  const value = useMemo(
    () => ({
      lessonCompleted,
      isProgressReady,
      progressLoadError,
      completeLesson,
      retryProgressLoad,
    }),
    [completeLesson, isProgressReady, lessonCompleted, progressLoadError, retryProgressLoad],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error('useProgress musi być użyte wewnątrz ProgressProvider.');
  }

  return context;
}
