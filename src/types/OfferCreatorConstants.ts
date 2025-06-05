import { OfferCreatorDTO } from "./OfferCreatorDTO";

export const formInitialData: OfferCreatorDTO = {
    id: null,
    brand: '',
    model: '',
    type: '',
    price: null,
    currency: 'PLN',
    year: null,
    fuel: null,
    mileage: null,
    power: null,
    displacement: null,
    imgUrl: '',
    description: ''
}

export enum CreatorStep {
    BasicData = "Marka i model",
    Images = "Zdjęcia",
    Details = "Dane techniczne",
    Description = "Opis",
    Price = "Cena",
    Summary = "Podsumowanie"
}
export enum StepValidationStatus {
    Unvisited,
    Invalid,
    Valid
}