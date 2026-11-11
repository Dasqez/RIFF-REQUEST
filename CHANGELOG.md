# Changelog

## 2026-11-11

- nowy wygląd całej aplikacji w stylu sceny i wzmacniacza (ciemne tło, pomarańcz i złoto, pochylona typografia),
- dodano onboarding w 5 krokach z zapisem profilu (poziom, style, czas, ręka, sprzęt),
- dodano dolną nawigację: Start, Trasa, Stroik, Profil,
- dodano mapę Trasa z lekcjami połączonymi ścieżką, panelem szczegółów i zapowiedzią rozdziału 2,
- przebudowano lekcję na kroki z gryfem (praworęczny i leworęczny), tabulaturą, metronomem i licznikiem uderzeń,
- dodano ekran ukończenia lekcji z nagrodą XP oraz ekrany Profil i Stroik (Stroik to tylko pokaz wyglądu).

## 2026-11-09

- dodano trwały lokalny zapis ukończenia pierwszej lekcji przez AsyncStorage,
- dodano bezpieczne ładowanie i walidację zapisu przed pokazaniem postępu,
- dodano obsługę błędów odczytu oraz zapisu bez udawania sukcesu,
- zachowano możliwość ponownego otwarcia ukończonej lekcji,
- udokumentowano reset postępu przeznaczony wyłącznie do testów.
- przeniesiono konfigurację ekranu startowego do pluginu wymaganego przez Expo SDK 58.
