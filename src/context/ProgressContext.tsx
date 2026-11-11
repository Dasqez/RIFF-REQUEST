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
import { Profile, loadProfile, saveProfile } from '@/storage/profileStorage';

export const LESSON_XP = 40;

type ProgressContextValue = {
  lessonCompleted: boolean;
  xp: number;
  profile: Profile | null;
  isProgressReady: boolean;
  progressLoadError: string | null;
  completeLesson: () => Promise<void>;
  updateProfile: (profile: Profile) => Promise<void>;
  retryProgressLoad: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: PropsWithChildren) {
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isProgressReady, setIsProgressReady] = useState(false);
  const [progressLoadError, setProgressLoadError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    let isActive = true;

    async function hydrateProgress() {
      setIsProgressReady(false);
      setProgressLoadError(null);

      try {
        const [completed, storedProfile] = await Promise.all([loadLessonCompleted(), loadProfile()]);

        if (isActive) {
          setLessonCompleted(completed);
          setProfile(storedProfile);
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

  const updateProfile = useCallback(async (nextProfile: Profile) => {
    await saveProfile(nextProfile);
    setProfile(nextProfile);
  }, []);

  const retryProgressLoad = useCallback(() => {
    setLoadAttempt((attempt) => attempt + 1);
  }, []);

  const value = useMemo(
    () => ({
      lessonCompleted,
      xp: lessonCompleted ? LESSON_XP : 0,
      profile,
      isProgressReady,
      progressLoadError,
      completeLesson,
      updateProfile,
      retryProgressLoad,
    }),
    [
      completeLesson,
      isProgressReady,
      lessonCompleted,
      profile,
      progressLoadError,
      retryProgressLoad,
      updateProfile,
    ],
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
