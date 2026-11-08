export const firstLesson = {
  title: 'Twój pierwszy dźwięk',
  eyebrow: 'LEKCJA 1 Z 1',
  goal: 'Zagraj cztery spokojne dźwięki na pustej, niskiej strunie E.',
  steps: [
    {
      title: 'Znajdź niską strunę E',
      description: 'To najgrubsza struna gitary. Gdy trzymasz gitarę do gry, znajduje się najbliżej Twojej twarzy.',
    },
    {
      title: 'Zostaw lewą dłoń luźno',
      description: 'Pusta struna brzmi bez naciskania żadnego progu. Na tym etapie niczego nie dociskaj.',
    },
    {
      title: 'Szarpnij delikatnie kostką',
      description: 'Uderz tylko najgrubszą strunę E spokojnym ruchem w dół i pozwól dźwiękowi wybrzmieć.',
    },
    {
      title: 'Powtórz cztery razy',
      description: 'Nie spiesz się. Zagraj cztery równe, osobne dźwięki i rozluźnij rękę po każdym z nich.',
    },
  ],
} as const;

export const strings = ['e', 'B', 'G', 'D', 'A', 'E'] as const;
