import { IconName } from '@/components/Icon';
import { Profile } from '@/storage/profileStorage';

export type Choice<T> = { value: T; title: string; description: string; icon: IconName };

export const levelChoices: Choice<Profile['level']>[] = [
  { value: 'zero', title: 'Zaczynam od zera', description: 'Nigdy nie trzymałem gitary', icon: 'flag' },
  { value: 'some', title: 'Znam kilka dźwięków', description: 'Potrafię zagrać proste rzeczy', icon: 'music' },
  { value: 'back', title: 'Wracam po przerwie', description: 'Grałem kiedyś, chcę odświeżyć', icon: 'rotate-ccw' },
];

export const genres = ['Rock', 'Metal', 'Blues', 'Punk', 'Grunge', 'Solówki', 'Pop', 'Jeszcze nie wiem'];

export const minuteChoices: Choice<Profile['minutes']>[] = [
  { value: 5, title: '5 minut', description: 'Szybki rozruch', icon: 'clock' },
  { value: 15, title: '15 minut', description: 'Polecane na start', icon: 'clock' },
  { value: 30, title: '30 minut', description: 'Solidny trening', icon: 'clock' },
  { value: 45, title: '45 minut', description: 'Pełny set', icon: 'clock' },
];

export const handChoices: Choice<Profile['hand']>[] = [
  { value: 'right', title: 'Praworęczny', description: 'Kostka w prawej, palce na gryfie w lewej', icon: 'arrow-right' },
  { value: 'left', title: 'Leworęczny', description: 'Lustrzane odbicie wszystkich diagramów', icon: 'arrow-left' },
];

export const gearChoices: Choice<Profile['gear']>[] = [
  { value: 'electric', title: 'Elektryczną', description: 'Z wzmacniaczem lub interfejsem', icon: 'zap' },
  { value: 'acoustic', title: 'Akustyczną', description: 'Wszystko zadziała tak samo', icon: 'disc' },
  { value: 'none', title: 'Jeszcze nie', description: 'Pokażemy, na co zwrócić uwagę', icon: 'search' },
];

export const defaultProfile: Profile = {
  level: 'zero',
  genres: ['Rock', 'Blues'],
  minutes: 15,
  hand: 'right',
  gear: 'electric',
};
