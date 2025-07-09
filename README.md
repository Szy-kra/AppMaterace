# AppMaterace
React + Vite + TypeScript + Bootstrap: front-end for mattress order management

# AppMaterace: System Zarządzania Zamówieniami Materacy

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple)
![Vite](https://img.shields.io/badge/Vite-5.0-yellow)

---

## 📌 Spis Treści

- [Opis Aplikacji](#opis-aplikacji)
- [Główne Funkcjonalności](#główne-funkcjonalności)
- [Przepływ Zamówienia](#przepływ-zamówienia)
- [Struktura Projektu](#struktura-projektu-kluczowe-pliki-i-ich-role)
- [Technologie](#️-technologie)
- [Uruchomienie Aplikacji](#uruchomienie-aplikacji)
- [Dalszy Rozwój](#dalszy-rozwój-potencjalne-funkcjonalności)

---

## 📄 Opis Aplikacji

**AppMaterace** to aplikacja front-endowa (React + TypeScript) wspierająca proces sprzedaży materacy. Umożliwia:

- zarządzanie klientami,
- konfigurowanie produktów (materacy),
- składanie oraz przeglądanie zamówień.

Aplikacja kładzie nacisk na:
- czytelność kodu (modułowa architektura),
- prostotę interfejsu użytkownika,
- przechowywanie danych lokalnie (`localStorage` – bez backendu),
- użycie komponentów `react-bootstrap` dla estetyki i responsywności.

---

## 🌟 Główne Funkcjonalności

### 1. Strona Główna (App)
- Informacje o firmie: nazwa, adres, telefon.
- Globalne style (`App.css`).

### 2. Zarządzanie Zamówieniami

#### a) **Nowe Zamówienie**
- Formularz dodawania zamówień z wyborem klienta i konfiguracją produktu.
- Automatyczne obliczanie ceny z cennika (`generatePriceListRows`).
- Nadawanie unikalnych numerów zamówień (format: `RRRRMMDD_N`).
- Przechowywanie zamówień w `localStorage`.
- Komunikat potwierdzający przyjęcie zlecenia.

#### b) **Lista Zamówień**
- Widok tabelaryczny wszystkich zamówień z informacjami o kliencie, statusie i produktach.

#### c) **Zarządzanie Produktami / OrderChangesPage**
- Obecnie komponent obsługuje zakładki: „Produkty”, „Konfiguracja”, „Cennik”.
- Choć nazwany „OrderChanges”, pełni aktualnie funkcję zarządzania produktem.

#### d) **Szczegóły Zamówienia**
- Planowana funkcjonalność. (Komponent niezaimplementowany).

---

### 3. Zarządzanie Klientami

#### a) **Nowy Klient**
- Formularz z walidacją: imię, nazwisko, email, telefon, adres, NIP.
- Dane dodawane do kontekstu `CustomerContext`.

#### b) **Lista Klientów**
- Przegląd wszystkich klientów w tabeli z opcją usunięcia.

---

### 4. Zarządzanie Produktami

#### a) **Lista Produktów**
- Zakładki:
  - **Produkty** – konfiguracja i przegląd materacy.
  - **Cennik** – tabela wszystkich możliwych konfiguracji z cenami.
- Filtrowanie i sortowanie dostępne w tabeli.
- Przycisk „Dodaj do koszyka” przekierowuje do formularza zamówienia z gotowymi danymi.

#### b) **Konfiguracja Produktów**
- Planowany komponent do zarządzania wariantami materacy. (Niezaimplementowany).

---

## 🔄 Przepływ Zamówienia

1. Użytkownik wybiera „Nowe Zamówienie”.
2. Wybiera klienta.
3. Konfiguruje produkt: twardość, kolor, rozmiar, nazwa.
4. System pobiera cenę i numer Lp. z cennika.
5. Dodaje produkt do zamówienia, może dodać więcej.
6. Po złożeniu:
   - Generowany jest numer zamówienia.
   - Dane trafiają do `localStorage`.
   - Pojawia się komunikat sukcesu.

---

## 📁 Struktura Projektu (Kluczowe Pliki i Ich Role)
src/
│ App.css
│ App.tsx
│ index.css
│ main.tsx
│
├───assets/ # Ikony, obrazy
├───calculatePrice/ # Komponent obliczania cen
│ CalculatePrice.tsx
│
├───const/ # Stałe konfiguracyjne
│ const.ts
│
├───context/ # Konteksty globalne (klienci, zamówienia, motyw)
│ CustomerContext.tsx
│ OrderContext.tsx
│ ThemeContext.tsx
│
├───customers/
│ CustomersPage.tsx
│
├───layout/
│ layout.tsx
│
├───newCustomer/
│ NewCustomerPage.tsx
│
├───newOrder/
│ NewOrderPage.tsx
│
├───orderChanges/
│ OrderChangesPage.tsx
│
├───ordersList/
│ OrdersListPage.tsx
│
├───products/
│ ProductsPage.tsx
│
└───types/
types.ts # Typy globalne
