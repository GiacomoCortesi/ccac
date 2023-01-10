import useSWR from 'swr';

import {ICart} from "../models/cart";
import {baseUrl} from "./api-product-service";
import axios from "axios";
import useSWRMutation from "swr/mutation";

export function useGetCart() {
    const fetcher = (url: string) => axios.get<ICart>(url, { withCredentials: true }).then(res => res.data)
    return useSWR(baseUrl + '/cart', fetcher);
}

export function useDeleteCartItem() {
    // @ts-ignore
    const fetcher = (url: string, {arg}) => axios.delete(url, {
        withCredentials: true,
        data: JSON.stringify(arg)
    })
    return useSWRMutation(baseUrl + '/cart', fetcher);
}

export function useAddToCart() {
    // @ts-ignore
    const fetcher = (url: string, {arg}) => axios.post<ICart>(url, JSON.stringify(arg) ,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.data); // Fetcher function
    // SWR hook
    return useSWRMutation(baseUrl + '/cart', fetcher);
}

