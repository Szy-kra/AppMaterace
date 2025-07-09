import { CustomerType, ProductType } from '../types/types';


// Stałe listy używane w aplikacji
export const comfortTypes = ['Miękki', 'Średni', 'Twardy'];
export const coverColors = ['Biały', 'Grafitowy', 'Beżowy'];
export const sizes = [
    '70x190', '70x200', '70x210', '70x220', '70x230', '70x240',
    '80x190', '80x200', '80x210', '80x220', '80x230', '80x240',
    '90x190', '90x200', '90x210', '90x220', '90x230', '90x240',
    '100x190', '100x200', '100x210', '100x220', '100x230', '100x240',
    '110x190', '110x200', '110x210', '110x220', '110x230', '110x240',
    '120x190', '120x200', '120x210', '120x220', '120x230', '120x240',
    '130x190', '130x200', '130x210', '130x220', '130x230', '130x240',
    '140x190', '140x200', '140x210', '140x220', '140x230', '140x240',
    '150x190', '150x200', '150x210', '150x220', '150x230', '150x240',
    '160x190', '160x200', '160x210', '160x220', '160x230', '160x240',
    '170x190', '170x200', '170x210', '170x220', '170x230', '170x240',
    '180x190', '180x200', '180x210', '180x220', '180x230', '180x240',
    '190x190', '190x200', '190x210', '190x220', '190x230', '190x240',
    '200x190', '200x200', '200x210', '200x220', '200x230', '200x240'
];

// Ceny bazowe dla materacy
export const basePrices: Record<string, number> = {
    'ClassicDur Bonnel': 999,
    'PocketFlow 7-Stref': 1499,
    'MultiPoint Prestige': 1999,
    'PureFoam Harmony': 1199,
    'PureFoam PU Ultra': 899,
    'LatexAir Supreme': 2499,
    'LatexAir Duo': 2799,
    'HybridFusion Elite': 2299,
};

// Dane klientów
export const allCustomers: CustomerType[] = [
    { id: 10001, firstName: 'Anna', lastName: 'Kowalska', email: 'anna.kowalska@example.com', phone: '123456789', address: 'ul. Przykładowa 1, Warszawa', nip: '1234567890' },
    { id: 10002, firstName: 'Jan', lastName: 'Nowak', email: 'jan.nowak@example.com', phone: '987654321', address: 'ul. Testowa 2, Kraków', nip: '0987654321' },
    { id: 10003, firstName: 'Katarzyna', lastName: 'Wiśniewska', email: 'katarzyna.wisniewska@example.com', phone: '555123456', address: 'ul. Słoneczna 10, Poznań', nip: '1122334455' },
    { id: 10004, firstName: 'Tomasz', lastName: 'Zieliński', email: 'tomasz.zielinski@example.com', phone: '666987654', address: 'ul. Leśna 5, Gdańsk', nip: '9988776655' }
];

// Dane produktów
export const allProducts: ProductType[] = [
    { idProd: '10001', nazwa: 'ClassicDur Bonnel', rodzajProd: 'Bonellowy', specyfikacja: { konstrukcja: 'Sprężyny Bonnell (zespół przymocowanych stalowych cewek)', warstwy: 'Pianka komfortowa + pokrowiec', komfortOptions: { miekki: 'H2 (miękki)', sredni: 'H2–H3 (średnio-twardy)', twardy: 'H3 (twardy)' }, komfort: 'H2–H3 (średnio-twardy)', cechy: 'Trwały, ekonomiczny, dobrze rozprowadza obciążenie; efekt "balansowania"; rodzinny wybór', bonel: 'tak', kieszeniowe: '-', multipocket: '-', piankaPU: 'tak', termo: '-', lateks: '-', hybryda: '-', sprezynaMiekka: '-', sprezynaTwarda: 'tak', piankaMiekka: 'tak', piankaTwarda: 'tak' } },
    { idProd: '10002', nazwa: 'PocketFlow 7-Stref', rodzajProd: 'Kieszeniowy', specyfikacja: { konstrukcja: 'Sprężyny kieszeniowe (indywidualnie opakowane) punktowo elastyczne', warstwy: 'Warstwa pianki, 7 stref komfortu', komfortOptions: { miekki: 'H2 (miękki)', sredni: 'H2–H3 (średnio-twardy)', twardy: 'H3 (twardy)' }, komfort: 'H2–H3 (średnio-twardy)', cechy: 'Wysoka izolacja ruchu, punktowe podparcie, idealny dla par', bonel: '-', kieszeniowe: 'tak', multipocket: '-', piankaPU: 'tak', termo: '-', lateks: '-', hybryda: '-', sprezynaMiekka: 'tak', sprezynaTwarda: 'tak', piankaMiekka: 'tak', piankaTwarda: 'tak' } },
    { idProd: '10003', nazwa: 'MultiPoint Prestige', rodzajProd: 'Multipocket', specyfikacja: { konstrukcja: 'Ponad 450–650 sprężyn pocket/multipocket na m²', warstwy: 'Pianka HR + kokos + pokrowiec', komfortOptions: { miekki: 'H2 (miękki)', sredni: 'H3 (średnio-twardy)', twardy: 'H4 (twardy)' }, komfort: 'H2–H4 (średnio-twardy)', cechy: 'Bardzo punktowe podparcie, 7 stref, usztywniony kokosem', bonel: '-', kieszeniowe: '-', multipocket: 'tak', piankaPU: 'tak', termo: '-', lateks: '-', hybryda: '-', sprezynaMiekka: 'tak', sprezynaTwarda: 'tak', piankaMiekka: 'tak', piankaTwarda: 'tak' } },
    { idProd: '10004', nazwa: 'PureFoam Harmony', rodzajProd: 'Piankowy', specyfikacja: { konstrukcja: 'Warstwa pianki HR (38 kg/m³)', warstwy: 'Pianka HR, pokrowiec', komfortOptions: { miekki: 'IL 25 (miękki)', sredni: 'IL 29 (medium)', twardy: 'IL 32 (twardy)' }, komfort: 'IL 29 (medium)', cechy: 'Uniwersalny komfort, lekki, dobrze dopasowuje się do ciała', bonel: '-', kieszeniowe: '-', multipocket: '-', piankaPU: 'tak', termo: '-', lateks: '-', hybryda: '-', sprezynaMiekka: '-', sprezynaTwarda: '-', piankaMiekka: 'tak', piankaTwarda: 'tak' } },
    { idProd: '10005', nazwa: 'PureFoam PU Ultra', rodzajProd: 'Piankowy (PU)', specyfikacja: { konstrukcja: 'Pianka PU (twardość 20 ILD)', warstwy: 'Pianka PU + dodatkowa pianka', komfortOptions: { miekki: 'IL 18 (miękki)', sredni: 'IL 22 (medium)', twardy: 'IL 25 (twardy)' }, komfort: 'IL 22 (medium)', cechy: 'Elastyczny, antyalergiczny, lekki; dobry dla lekkich osób', bonel: '-', kieszeniowe: '-', multipocket: '-', piankaPU: 'tak', termo: '-', lateks: '-', hybryda: '-', sprezynaMiekka: '-', sprezynaTwarda: '-', piankaMiekka: 'tak', piankaTwarda: 'tak' } },
    { idProd: '10006', nazwa: 'LatexAir Supreme', rodzajProd: 'Lateksowy', specyfikacja: { konstrukcja: 'Naturalny lateks (Dunlop/Talalay), wentylowany', warstwy: 'Wiórki lateksu, pokrowiec z wełną', komfortOptions: { miekki: 'H2 (medium)', sredni: 'H3 (medium-firm)', twardy: 'H4 (firm)' }, komfort: 'H3 (medium-firm)', cechy: 'Hipoalergiczny, bardzo trwały (>15 lat), świetna wentylacja', bonel: '-', kieszeniowe: '-', multipocket: '-', piankaPU: '-', termo: '-', lateks: 'tak', hybryda: '-', sprezynaMiekka: '-', sprezynaTwarda: '-', piankaMiekka: 'tak', piankaTwarda: 'tak' } },
    { idProd: '10007', nazwa: 'LatexAir Duo', rodzajProd: 'Lateksowy (dwustronny)', specyfikacja: { konstrukcja: 'Dwustronny lateks z różnymi twardościami (soft/firm)', warstwy: '2 warstwy lateksu, 2 pokrowce', komfortOptions: { miekki: 'H2 (miękki)', sredni: 'H3 (medium)', twardy: 'H4 (twardy)' }, komfort: 'H3 (medium)', cechy: 'Odwracalny: miękka vs twardsza strona, elastyczny i trwały', bonel: '-', kieszeniowe: '-', multipocket: '-', piankaPU: '-', termo: '-', lateks: 'tak', hybryda: '-', sprezynaMiekka: '-', sprezynaTwarda: '-', piankaMiekka: 'tak', piankaTwarda: 'tak' } },
    { idProd: '10008', nazwa: 'HybridFusion Elite', rodzajProd: 'Hybrydowy', specyfikacja: { konstrukcja: 'Pocket sprężyny + warstwa pianki HR/memory/latex', warstwy: 'Kilka warstw pianki + sprężyny', komfortOptions: { miekki: 'H2 (miękki)', sredni: 'H2–H3 (medium-firm)', twardy: 'H3 (twardy)' }, komfort: 'H2–H3 (medium-firm)', cechy: 'Połączenie punktowego wsparcia i komfortu pianki, dobra izolacja ruchu', bonel: '-', kieszeniowe: '-', multipocket: '-', piankaPU: '-', termo: 'tak', lateks: '-', hybryda: 'tak', sprezynaMiekka: 'tak', sprezynaTwarda: 'tak', piankaMiekka: 'tak', piankaTwarda: 'tak' } }
];