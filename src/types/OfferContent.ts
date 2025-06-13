export enum OfferType {
    passenger = "osobowe",
    cargo = "towarowe",
    specialized = "budowlane",
    other = "inne"
}

export enum FuelType {
    petrol="benzyna",
    diesel="diesel",
    petrolLpg="benzyna+lpg"
}

export type OfferContent = {
    id: number;
    brand: string;
    model: string;
    type: OfferType;
    price: number;
    currency: string;
    year: number;
    fuel: FuelType;
    mileage: number;
    power: number;
    displacement: string;
    imgUrl: string;
    description: string;
}