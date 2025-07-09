// src/calculatePrice/CalculatePrice.tsx

import { allProducts, comfortTypes, coverColors, sizes, basePrices } from '../types/types';

interface PriceListRow {
    id: number;
    nazwaMateraca: string;
    rozmiar: string;
    kolorPokrowca: string;
    twardoscWkladu: string;
    cena: number;
}

export const calculatePrice = (mattressName: string, size: string, comfort: string, color: string): number => {
    let currentPrice = 0;
    const [widthStr, lengthStr] = size.split('x');
    const width = parseInt(widthStr);
    const length = parseInt(lengthStr);

    if (basePrices[mattressName]) {
        currentPrice = basePrices[mattressName];
    } else {
        return 0;
    }

    const baseWidth = 80;
    const baseLength = 200;
    const currentArea = width * length;

    if (width > baseWidth || length > baseLength) {
        if (currentArea > (baseWidth * baseLength) && currentArea <= (120 * 200)) {
            currentPrice += 40;
        } else if (currentArea > (120 * 200) && currentArea < (200 * 200)) {
            currentPrice += 80;
        } else if (currentArea >= (200 * 200)) {
            currentPrice += 160;
        }
    }

    if (color !== 'Bia³y') {
        currentPrice += 40;
    }

    if (comfort === 'Miêkki') {
        currentPrice -= 40;
    } else if (comfort === 'Twardy') {
        currentPrice += 40;
    }

    return currentPrice;
};

export const generatePriceListRows = (): PriceListRow[] => {
    const rows: PriceListRow[] = [];
    let keyCounter = 101;
    const mattressNames = allProducts.map(p => p.nazwa);

    mattressNames.forEach(mattressName => {
        sizes.forEach(size => {
            comfortTypes.forEach(comfort => {
                coverColors.forEach(color => {
                    const priceValue = calculatePrice(mattressName, size, comfort, color);
                    rows.push({
                        id: keyCounter++,
                        nazwaMateraca: mattressName,
                        rozmiar: size,
                        kolorPokrowca: color,
                        twardoscWkladu: comfort,
                        cena: priceValue
                    });
                });
            });
        });
    });
    return rows;
};