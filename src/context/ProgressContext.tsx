import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

type ProgressContextValue = {
  lessonCompleted: boolean;
  completeLesson: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: PropsWithChildren) {
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const value = useMemo(
    () => ({ lessonCompleted, completeLesson: () => setLessonCompleted(true) }),
    [lessonCompleted],
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
