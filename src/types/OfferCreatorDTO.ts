export type OfferCreatorDTO = {
    id: number | null;
    brand: string;
    model: string;
    type: string;
    price: number | null;
    currency: string;
    year: number | null;
    fuel: string | null;
    mileage: number | null;
    power: number | null;
    displacement: string | null;
    imgUrl: string;
    description: string;
}