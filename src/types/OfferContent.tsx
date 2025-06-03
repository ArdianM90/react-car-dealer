export type OfferContent = {
    id: number;
    brand: string;
    model: string;
    type: string;
    price: number;
    year: number | null;
    fuel: string | null;
    mileage: number | null;
    power: number | null;
    displacement: string | null;
    imgUrl: string;
    description: string;
}