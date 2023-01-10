import useSWRMutation from "swr/mutation";
import {baseUrl} from "./api-product-service";
import axios from "axios";
import useSWR from "swr";
import {IOrder} from "../models/order";

export function useGetOrder(orderID: string) {
    const fetcher = (url: string) => axios.get<IOrder>(url, { withCredentials: true }).then(res => res.data)
    return useSWR(baseUrl + '/order/' + orderID, fetcher);
}

// @ts-ignore
const fetchPOST = (url: string, {arg}) => axios.post(url, JSON.stringify(arg) ,
    {
        headers: {
            method: 'POST',
            'Content-Type': 'application/json'
        }
    }).then((res: { data: any; }) => res.data);

export function useCreateOrder() {
    // SWR hook
    return useSWRMutation(baseUrl + '/order', fetchPOST);
}

export function useCompleteOrder() {
    // SWR hook
    return useSWRMutation(baseUrl + '/order/complete', fetchPOST);
}
