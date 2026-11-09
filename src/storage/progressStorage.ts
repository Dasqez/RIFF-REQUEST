import AsyncStorage from '@react-native-async-storage/async-storage';

export const PROGRESS_STORAGE_KEY = '@riff-quest/progress:v1';

type StoredProgress = {
  version: 1;
  firstLessonCompleted: boolean;
};

const emptyProgress: StoredProgress = {
  version: 1,
  firstLessonCompleted: false,
};

function isStoredProgress(value: unknown): value is StoredProgress {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<StoredProgress>;

  return candidate.version === 1 && typeof candidate.firstLessonCompleted === 'boolean';
}

export async function loadLessonCompleted() {
  const storedValue = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);

  if (storedValue === null) {
    return emptyProgress.firstLessonCompleted;
  }

  const parsedValue: unknown = JSON.parse(storedValue);

  if (!isStoredProgress(parsedValue)) {
    throw new Error('Zapis postępu ma nieobsługiwany format.');
  }

  return parsedValue.firstLessonCompleted;
}

export async function saveLessonCompleted() {
  const progress: StoredProgress = {
    version: 1,
    firstLessonCompleted: true,
  };

  await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export async function resetProgressForTesting() {
  await AsyncStorage.removeItem(PROGRESS_STORAGE_KEY);
}
