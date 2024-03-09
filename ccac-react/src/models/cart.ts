import { IPrice } from "./product";
import { IShipping } from "./shipping";

export interface ICart {
    id: string;
    items: ICartItem[];
    user_id: string;
    total: IPrice;
    shipping_options: IShipping[];
}
export interface ICartItem {
    sku: string;
    quantity: number;
    product_id: string;
    total: IPrice;
}
