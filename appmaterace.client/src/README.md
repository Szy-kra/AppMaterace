# AppMaterace: System Zarządzania Zamówieniami Materacy

## Spis Treści
- Opis Aplikacji
- Główne Funkcjonalności
    - 1. Strona Główna (App)
    - 2. Zarządzanie Zamówieniami
    - 3. Zarządzanie Klientami
    - 4. Zarządzanie Produktami
- Przepływ Zamówienia
- Struktura Projektu (Kluczowe Pliki i Ich Role)
- Technologie
- Uruchomienie Aplikacji
- Dalszy Rozwój (Potencjalne Funkcjonalności)

---

## Opis Aplikacji
AppMaterace to system front-endowy stworzony w React i TypeScript, wspierający zarządzanie procesem sprzedaży materacy. Aplikacja umożliwia obsługę klientów, zarządzanie katalogiem produktów z różnymi konfiguracjami oraz składanie i śledzenie zamówień. System kładzie nacisk na modularyzację, czytelność kodu i wygodę użytkownika, wykorzystując lokalny magazyn przeglądarki (`localStorage`) do symulacji trwałości danych.

## Główne Funkcjonalności

### 1. Strona Główna (App)
- Wyświetla podstawowe informacje o firmie, takie jak nazwa, adres i numer telefonu.
- Korzysta z globalnych stylów z App.css.

### 2. Zarządzanie Zamówieniami

#### a) Nowe Zamówienie (New Order)
- Formularz do tworzenia nowych zamówień.
- Wybór klienta: Klienta można wybrać z rozwijanej listy wszystkich dostępnych klientów. Dane klientów są zarządzane przez CustomerContext i przechowywane w localStorage.
- Wybór konfiguracji produktu: Produkt do zamówienia wybiera się za pomocą rozwijanych list dla Nazwy Materaca, Twardości Wkładu, Koloru Pokrowca i Rozmiaru.
- Dynamiczne obliczanie ceny: Cena jednostkowa i całkowita dla wybranej konfiguracji produktu jest automatycznie pobierana z centralnego cennika (generowanego przez generatePriceListRows) i wyświetlana w czasie rzeczywistym.
- Dodawanie do zamówienia: Dodaje skonfigurowany produkt z określoną ilością do listy pozycji zamówienia. Numer Lp. dla pozycji w zamówieniu jest numerowany sekwencyjnie od 1.
- Generowanie numeru zamówienia: Po złożeniu zamówienia generowany jest unikalny numer zlecenia oparty na dacie (RRRRMMDD) z sekwencyjnym sufiksem (_N), jeśli na dany dzień istnieje już zamówienie.
- Zapis zamówienia: Złożone zamówienie jest symulowane jako "wysłane" poprzez zapis do przeglądarkowego `localStorage`.
- Komunikat sukcesu: Po złożeniu zamówienia wyświetla się komunikat potwierdzający przyjęcie zlecenia i czas realizacji.
- Może przyjmować pre-wybrane dane produktu ze strony Products za pomocą `useLocation` z React Router.

#### b) Lista Zamówień (Orders List)
- Wyświetla tabelę wszystkich złożonych zamówień.
- Pobiera dane zamówień z `OrderContext`.
- Dane zamówień są przechowywane w `localStorage`, zapewniając trwałość sesji.
- Wyświetla numer zamówienia, datę, klienta, listę zamówionych produktów, całkowitą wartość i status.
- Zawiera przycisk "Szczegóły" do podglądu, który prowadzi do OrderChangesPage.

#### c) Modyfikacja Zamówienia (Order Changes)
- Uwaga: Zgodnie z dostarczonym kodem (OrderChangesPage.tsx), ten komponent nosi tytuł "Zarządzanie Produktami" i zawiera zakładki "Lista produktów", "Konfiguracja" oraz "Cennik". Sugeruje to jego obecne zastosowanie jako komponentu do zarządzania produktami, a nie modyfikacji zamówień. Jego pierwotne przeznaczenie (anulowanie całości/części zamówienia, zmiana terminu dostawy, scalanie, zmiana konfiguracji) jest zgodne z opisem projektu, ale nie z obecną implementacją pliku.

#### d) Szczegóły Zamówienia (Order Details Page)
- Planowana strona do wyświetlania szczegółów pojedynczego zamówienia po kliknięciu. (Komponent niezaimplementowany w dostarczonym kodzie).

### 3. Zarządzanie Klientami (Customers)

#### a) Nowy Klient (New Customer)
- Formularz do dodawania nowych klientów.
- Pola formularza: Imię, Nazwisko, Email, Telefon (z prefiksem), Adres, NIP.
- Zawiera podstawową walidację danych (np. format email, długość NIP/telefonu, wymagane pola).
- Dodaje nowych klientów do listy zarządzanej przez `CustomerContext`. Po zapisie nawiguje do strony listy klientów (/Customers).

#### b) Lista Klientów (Customers Page)
- Wyświetla tabelaryczną listę wszystkich klientów.
- Pobiera dane klientów z `CustomerContext`.
- Umożliwia usuwanie klientów z listy.
- Dane klientów są przechowywane w `localStorage` dla trwałości.

### 4. Zarządzanie Produktami (Products)

#### a) Lista Produktów (Products Page)
- Wyświetla szczegółową listę dostępnych materacy w dwóch zakładkach: "Produkty" i "Cennik".
- Zakładka "Produkty": Pokazuje nazwę, kategorię, pełną specyfikację, oraz pozwala na konfigurację (komfort, kolor, rozmiar) dla każdego produktu. Wyświetla również obrazek materaca i cenę aktualnie wybranej konfiguracji.
- Zakładka "Cennik": Prezentuje tabelę wszystkich dostępnych konfiguracji materacy z ich unikalnymi numerami Lp. i cenami. Umożliwia filtrowanie (po nazwie, rozmiarze, kolorze, twardości) i sortowanie po kolumnach.
- Przycisk "Dodaj do koszyka" obok ceny w zakładce "Produkty" przekierowuje do formularza "Nowe Zamówienie" (NewOrderPage) z pre-wypełnionymi danymi wybranego materaca.

#### b) Konfiguracja Produktów (Configuration Page)
- Planowana strona do szczegółowej konfiguracji komponentów produktu. (Komponent niezaimplementowany w dostarczonym kodzie).

## Przepływ Zamówienia
- Użytkownik klika "Nowe Zamówienie" (lub dodaje produkt z `ProductsPage`).
- Przechodzi do `NewOrderPage`.
- Wybiera klienta z listy rozwijanej.
- Wybiera materac z listy rozwijanej, a następnie konfiguruje go (twardość, kolor, rozmiar).
- System automatycznie pobiera cenę i Lp. dla wybranej konfiguracji z już wygenerowanego `Cennika`.
- Użytkownik dodaje produkt do zamówienia, może dodawać kolejne pozycje.
- Po zatwierdzeniu ("Złóż Zamówienie"), zamówienie jest zapisywane lokalnie w `localStorage` i generowany jest unikalny numer zamówienia. Wyświetla się komunikat o przyjęciu zlecenia.
- Późniejsze modyfikacje istniejących zamówień są przewidziane na stronie `OrderChangesPage` (zgodnie z opisem, ale aktualna implementacja `OrderChangesPage` jest inna).

## Struktura Projektu (Kluczowe Pliki i Ich Role)

src:.
│   App.css
│   App.tsx
│   index.css
│   main.tsx
│
├───assets
├───calculatePrice
│       CalculatePrice.tsx
│
├───const
│       const.ts
│
├───context
│       CustomerContext.tsx
│       OrderContext.tsx
│       ThemeContext.tsx
│
├───customers
│       CustomersPage.tsx
│
├───layout
│       layout.tsx
│
├───newCustomer
│       NewCustomerPage.tsx
│
├───newOrder
│       NewOrderPage.tsx
│
├───orderChanges
│       OrderChangesPage.tsx
│
├───ordersList
│       OrdersListPage.tsx
│
├───products
│       ProductsPage.tsx
│
└───types
        types.ts

