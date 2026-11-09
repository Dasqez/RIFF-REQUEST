# RIFF QUEST

RIFF QUEST to mobilna aplikacja do nauki gry na gitarze elektrycznej od absolutnych podstaw. Obecny Etap 0 dostarcza jedną kompletną ścieżkę: ekran startowy → pierwsza lekcja → oznaczenie ukończenia → powrót z widocznym postępem.

## Co działa

- ekran startowy w języku polskim,
- lekcja „Twój pierwszy dźwięk” z czterema prostymi krokami,
- wizualizacja sześciu strun z zaznaczoną niską struną E,
- poprawna tabulatura czterech pustych dźwięków: `0 0 0 0` na dolnej linii E,
- oznaczenie ukończenia i aktualizacja postępu na ekranie startowym,
- trwały zapis ukończenia lekcji po zamknięciu lub odświeżeniu aplikacji,
- układ dostosowany do telefonu i przeglądarki,
- routing przygotowany dla Androida, iOS i web.

Postęp jest przechowywany lokalnie przez AsyncStorage. Podczas uruchamiania aplikacja najpierw bezpiecznie odczytuje i sprawdza zapis, dlatego ekran główny nie pokazuje przejściowego, błędnego wyniku `0 / 1`. Lekcję można ponownie otworzyć po jej ukończeniu.

## Uruchomienie na Windowsie

Wymagany jest Node.js w wersji LTS, npm oraz Git. Przy pierwszym pobraniu projektu w PowerShell wykonaj:

```powershell
cd C:\Projekty
git clone https://github.com/Dasqez/RIFF-REQUEST.git "RIFF REQUEST"
cd "C:\Projekty\RIFF REQUEST"
npm install
npm run web
```

Jeśli projekt już istnieje w tym katalogu, pobierz najnowsze zmiany przed rozpoczęciem pracy:

```powershell
cd "C:\Projekty\RIFF REQUEST"
git pull origin main
npm install
```

Expo wyświetli adres podglądu web. Aby uruchomić serwer dla aplikacji mobilnej:

```powershell
npm start
```

Następnie zeskanuj kod QR w aplikacji Expo Go albo uruchom Android Emulator i naciśnij `a` w terminalu. Lokalny build iOS wymaga macOS; na Windowsie można korzystać z urządzenia iPhone przez Expo Go.

## Sprawdzenia projektu

```powershell
npm run typecheck
npm run lint
npx expo-doctor
```

Build statycznego podglądu web:

```powershell
npx expo export --platform web
```

### Reset postępu do testów

Aplikacja celowo nie pokazuje użytkownikowi przycisku resetowania. Na webie usuń wyłącznie klucz postępu w konsoli narzędzi deweloperskich przeglądarki i odśwież stronę:

```js
localStorage.removeItem('@riff-quest/progress:v1');
```

Na Androidzie lub iOS wyczyść dane aplikacji albo odinstaluj ją z urządzenia testowego. Klucz używany przez kod jest również eksportowany jako `PROGRESS_STORAGE_KEY`, a funkcja `resetProgressForTesting()` w `src/storage/progressStorage.ts` jest przeznaczona dla przyszłych testów automatycznych i narzędzi deweloperskich.

## Aktualny zakres

Etap 0 nie używa mikrofonu, analizy dźwięku, interfejsu Behringer, odtwarzacza, metronomu, kont ani backendu. Te funkcje pozostają w [ROADMAP.md](./ROADMAP.md).

## Następny mały krok

Rozpocząć kolejny mały fragment Etapu 1 bez rozszerzania jeszcze zakresu o mikrofon lub analizę audio.
