export const firstLesson = {
  title: 'Twój pierwszy dźwięk',
  minutes: 4,
  xp: 40,
  goal: 'Zagraj cztery spokojne dźwięki na pustej, niskiej strunie E.',
  steps: [
    {
      title: 'Znajdź niską strunę E',
      description: 'To najgrubsza struna. Gdy trzymasz gitarę, jest najbliżej Twojej twarzy.',
      showTab: false,
    },
    {
      title: 'Zostaw lewą dłoń luźno',
      description: 'Pusta struna brzmi bez naciskania progu. Niczego nie dociskaj.',
      showTab: false,
    },
    {
      title: 'Szarpnij delikatnie kostką',
      description: 'Jeden spokojny ruch w dół po najgrubszej strunie. Pozwól jej wybrzmieć.',
      showTab: true,
    },
    {
      title: 'Powtórz cztery razy',
      description: 'Zagraj cztery równe dźwięki. Dotknij kółka po każdym uderzeniu.',
      showTab: true,
    },
  ],
} as const;

export const strings = ['e', 'B', 'G', 'D', 'A', 'E'] as const;

export type TrailLesson = {
  title: string;
  minutes: number;
  xp: number;
  icon: 'zap' | 'minus' | 'music' | 'triangle' | 'award';
  x: number;
  y: number;
  boss?: boolean;
};

export const trailLessons: TrailLesson[] = [
  { title: 'Twój pierwszy dźwięk', minutes: 4, xp: 40, icon: 'zap', x: 30, y: 110 },
  { title: 'Gdzie jest próg?', minutes: 5, xp: 40, icon: 'minus', x: 70, y: 250 },
  { title: 'Nazwy strun', minutes: 5, xp: 40, icon: 'music', x: 32, y: 390 },
  { title: 'Trzymamy kostkę', minutes: 6, xp: 40, icon: 'triangle', x: 68, y: 530 },
  { title: 'Pierwszy riff', minutes: 8, xp: 120, icon: 'award', x: 50, y: 690, boss: true },
];
