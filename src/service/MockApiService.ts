import {OfferContent, OfferType} from '../types/OfferContent';
import {OfferCreatorDTO} from "../types/OfferCreatorDTO.ts";

let items: OfferContent[] = [
    {
        id: 1,
        type: OfferType.passenger,
        brand: "Skoda",
        model: "Octavia 2 RS",
        price: 15000,
        currency: "PLN",
        year: 2006,
        fuel: "Benzyna",
        mileage: 160,
        power: 200,
        displacement: "2.0",
        imgUrl: "/assets/img/skoda.jpeg",
        description: ''
    },
    {
        id: 2,
        type: OfferType.passenger,
        brand: "Dodge",
        model: "Viper",
        price: 80000,
        currency: "PLN",
        year: 1998,
        fuel: "Diesel",
        mileage: 80,
        power: 400,
        displacement: "4.6",
        imgUrl: "/assets/img/dodge.jpeg",
        description: ''
    },
    {
        id: 3,
        type: OfferType.passenger,
        brand: "BMW",
        model: "320d",
        price: 59900,
        currency: "PLN",
        year: 2013,
        fuel: "Diesel",
        mileage: 240,
        power: 184,
        displacement: "2.0",
        imgUrl: "/assets/img/bmw.jpeg",
        description: ''
    },
    {
        id: 4,
        type: OfferType.passenger,
        brand: "Audi",
        model: "A4 B8",
        price: 35000,
        currency: "PLN",
        year: 2011,
        fuel: "Benzyna",
        mileage: 190,
        power: 211,
        displacement: "2.0",
        imgUrl: "/assets/img/audi.jpeg",
        description: ''
    },
    {
        id: 5,
        type: OfferType.passenger,
        brand: "Volkswagen",
        model: "Golf VII GTI",
        price: 46000,
        currency: "PLN",
        year: 2015,
        fuel: "Benzyna",
        mileage: 145,
        power: 230,
        displacement: "2.0",
        imgUrl: "/assets/img/vw.jpeg",
        description: ''
    },
    {
        id: 6,
        type: OfferType.passenger,
        brand: "Mazda",
        model: "6",
        price: 27000,
        currency: "PLN",
        year: 2012,
        fuel: "Diesel",
        mileage: 210,
        power: 163,
        displacement: "2.2",
        imgUrl: "/assets/img/mazda.jpeg",
        description: ''
    },
    {
        id: 7,
        type: OfferType.cargo,
        brand: "Ford",
        model: "Transit",
        price: 32000,
        currency: "PLN",
        year: 2017,
        fuel: "Diesel",
        mileage: 180,
        power: 130,
        displacement: "2.2",
        imgUrl: "/assets/img/transit.jpeg",
        description: ''
    },
    {
        id: 8,
        type: OfferType.cargo,
        brand: "Renault",
        model: "Master",
        price: 28000,
        currency: "PLN",
        year: 2015,
        fuel: "Diesel",
        mileage: 210,
        power: 125,
        displacement: "2.3",
        imgUrl: "/assets/img/renault.jpeg",
        description: ''
    },
    {
        id: 9,
        type: OfferType.cargo,
        brand: "Mercedes-Benz",
        model: "Sprinter",
        price: 45000,
        currency: "PLN",
        year: 2019,
        fuel: "Diesel",
        mileage: 150,
        power: 143,
        displacement: "2.1",
        imgUrl: "/assets/img/sprinter.jpeg",
        description: ''
    },
    {
        id: 10,
        type: OfferType.specialized,
        brand: "Caterpillar",
        model: "D6T",
        price: 320000,
        currency: "PLN",
        year: 2014,
        fuel: "Diesel",
        mileage: 12,
        power: 215,
        displacement: "7.2",
        imgUrl: "/assets/img/catterpilar.jpeg",
        description: ''
    },
    {
        id: 11,
        type: OfferType.specialized,
        brand: "JCB",
        model: "3CX",
        price: 150000,
        currency: "PLN",
        year: 2016,
        fuel: "Diesel",
        mileage: 8,
        power: 100,
        displacement: "4.4",
        imgUrl: "/assets/img/jcb.jpeg",
        description: ''
    },
    {
        id: 12,
        type: OfferType.specialized,
        brand: "Komatsu",
        model: "PC210",
        price: 200000,
        currency: "PLN",
        year: 2018,
        fuel: "Diesel",
        mileage: 10,
        power: 165,
        displacement: "6.7",
        imgUrl: "/assets/img/komatsu.jpeg",
        description: ''
    },
    {
        id: 13,
        type: OfferType.other,
        brand: "Cadillac",
        model: "Limo",
        price: 200000,
        currency: "PLN",
        year: 2018,
        fuel: "Diesel",
        mileage: 150,
        power: 180,
        displacement: "6.7",
        imgUrl: "/assets/img/limo.jpeg",
        description: ''
    },
    {
        id: 14,
        type: OfferType.other,
        brand: "Morris",
        model: "Vintage",
        price: 300000,
        currency: "PLN",
        year: 1978,
        fuel: "Benzyna",
        mileage: 80,
        power: 80,
        displacement: "0.6",
        imgUrl: "/assets/img/morris.jpeg",
        description: ''
    },
    {
        id: 15,
        type: OfferType.passenger,
        brand: "Land Rover",
        model: "Range Rover",
        price: 260000,
        currency: "PLN",
        year: 2021,
        fuel: "Diesel",
        mileage: 150,
        power: 220,
        displacement: "2.4",
        imgUrl: "/assets/img/range.jpeg",
        description: ''
    },
    {
        id: 16,
        type: OfferType.other,
        brand: "Volkswagen",
        model: "California",
        price: 320000,
        currency: "PLN",
        year: 2017,
        fuel: "Diesel",
        mileage: 180,
        power: 150,
        displacement: "1.8",
        imgUrl: "/assets/img/camper.jpeg",
        description: ''
    },
];

export const getVehicles = (): Promise<OfferContent[]> => {
    return Promise.resolve(items);
}

export const persistChanges = (data: OfferCreatorDTO): void => {
    console.log(data)
    if (data.id === null) {
        addVehicle(data)
    } else {
        updateVehicle(data);
    }
}

export const addVehicle = (data: OfferCreatorDTO): void => {
    const id: number = Math.max(...items.map(item => item.id), 0) + 1;
    const newVehicle: OfferContent = mapToOfferContent(data, id);
    items = [...items, newVehicle];
}

export const updateVehicle = (data: OfferCreatorDTO): void => {
    const newVehicle: OfferContent = mapToOfferContent(data, Number(data.id));
    items = items.map((item: OfferContent) => item.id === data.id ? newVehicle : item);
}

export const mapToOfferContent = (dto: OfferCreatorDTO, id: number): OfferContent => {
    return {
        id: id,
        brand: dto.brand,
        model: dto.model,
        type: dto.type,
        price: Number(dto.price),
        currency: dto.currency,
        year: Number(dto.year),
        fuel: String(dto.fuel),
        mileage: Math.floor(Number(dto.mileage) / 1000),
        power: Number(dto.power),
        displacement: String(dto.displacement),
        imgUrl: dto.imgUrl,
        description: dto.description,
    };
}

export const getRecommendedVehicles = (): Promise<OfferContent[]> => {
    const recommendedIds = [1, 2, 3, 4, 5, 6];
    return Promise.resolve(items.filter(item => recommendedIds.includes(item.id)));
}

export const getVehiclesByType = (type: OfferType | undefined): Promise<OfferContent[]> => {
    if (type !== undefined) {
        Promise.resolve(items.filter(item => (!type || item.type === type)));
    }
    return Promise.resolve(items);
}

export const getGalleryImagesByItemId = (itemId: number): { original: string; thumbnail: string }[] => {
    const sourceItem = items.find(item => item.id === itemId);
    if (!sourceItem) {
        return [];
    }
    const resultArr: string[] = [sourceItem.imgUrl];
    const additionalImages = items
        .filter(item => item.type === sourceItem.type && item.id !== itemId)
        .map(i => i.imgUrl);
    return (resultArr.concat(additionalImages))
        .map(url => ({
            original: url,
            thumbnail: url
        }));
};