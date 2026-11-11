import AsyncStorage from '@react-native-async-storage/async-storage';

export const PROFILE_STORAGE_KEY = '@riff-quest/profile:v1';

export type Profile = {
  level: 'zero' | 'some' | 'back';
  genres: string[];
  minutes: 5 | 15 | 30 | 45;
  hand: 'right' | 'left';
  gear: 'electric' | 'acoustic' | 'none';
};

type StoredProfile = { version: 1; profile: Profile };

function isProfile(value: unknown): value is Profile {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<Profile>;

  return (
    typeof candidate.level === 'string' &&
    Array.isArray(candidate.genres) &&
    typeof candidate.minutes === 'number' &&
    (candidate.hand === 'right' || candidate.hand === 'left') &&
    typeof candidate.gear === 'string'
  );
}

export async function loadProfile(): Promise<Profile | null> {
  const storedValue = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);

  if (storedValue === null) {
    return null;
  }

  const parsedValue = JSON.parse(storedValue) as Partial<StoredProfile>;

  if (parsedValue.version !== 1 || !isProfile(parsedValue.profile)) {
    throw new Error('Zapis profilu ma nieobsługiwany format.');
  }

  return parsedValue.profile;
}

export async function saveProfile(profile: Profile) {
  const stored: StoredProfile = { version: 1, profile };

  await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(stored));
}
