import {FuelType, OfferType} from "./OfferContent.ts";

export type FilterDTO = {
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