import axios from 'axios'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { IOrder } from '../models/order'
import { baseUrl } from './api-product-service'

export function useGetOrder(orderID: string) {
  const fetcher = (url: string) =>
    axios.get<IOrder>(url, { withCredentials: true }).then((res) => res.data)
  return useSWR(baseUrl + '/order/' + orderID, fetcher)
}

const fetchPOST = (url: string, { arg }: any) =>
  axios
    .post(url, JSON.stringify(arg), {
      headers: {
        method: 'POST',
        'Content-Type': 'application/json',
      },
    })
    .then((res: { data: any }) => res.data)

export function useCreateOrder() {
  // SWR hook
  return useSWRMutation(baseUrl + '/order', fetchPOST)
}

export function useCompleteOrder() {
  // SWR hook
  return useSWRMutation(baseUrl + '/order/complete', fetchPOST)
}
