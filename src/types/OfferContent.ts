export enum OfferType {
    passenger = "osobowe",
    cargo = "towarowe",
    specialized = "budowlane",
    other = "inne"
}

export type OfferContent = {
    id: number;
    brand: string;
    model: string;
    type: OfferType;
    price: number;
    currency: string;
    year: number;
    fuel: string;
    mileage: number;
    power: number;
    displacement: string;
    imgUrl: string;
    description: string;
}