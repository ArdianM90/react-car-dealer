import {FuelType, OfferType} from "./OfferContent.ts";

export type FilterValueType = string | number | OfferType | FuelType | null;

export type Filter = {
    category: OfferType | null;
    name: string | null;
    priceFrom: number | null;
    priceTo: number | null;
    powerFrom: number | null;
    powerTo: number | null;
    displacementFrom: number | null;
    displacementTo: number | null;
    fuel: FuelType | null;
}

export const filterInitialData: Filter = {
    category: null,
    name: null,
    priceFrom: null,
    priceTo: null,
    powerFrom: null,
    powerTo: null,
    displacementFrom: null,
    displacementTo: null,
    fuel: null
}