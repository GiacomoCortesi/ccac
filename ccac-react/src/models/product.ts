export interface IProduct {
    id: string;
    sku: string;
    rating: number;
    type: string;
    categories: string[];
    title: string;
    description: string;
    images: string[];
    price: IPrice;
    options: IOptions;
    quantity: number;
    variations: IProduct[];
}

export interface IPrice {
    value: string;
    currency: string;
}

export interface IOptions {
    color: string;
    size: string;
    available_colors: string[]
    available_sizes: string[]
}
