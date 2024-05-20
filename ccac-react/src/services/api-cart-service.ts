import useSWR from 'swr'

import axios from 'axios'
import useSWRMutation from 'swr/mutation'
import { ICart } from '../models/cart'
import { baseUrl } from './api-product-service'

export function useGetCart() {
  const fetcher = (url: string) =>
    axios.get<ICart>(url, { withCredentials: true }).then((res) => res.data)
  return useSWR(baseUrl + '/cart', fetcher)
}

export function useDeleteCartItem() {
  const fetcher = (url: string, { arg }) =>
    axios.delete(url, {
      withCredentials: true,
      data: JSON.stringify(arg),
    })
  return useSWRMutation(baseUrl + '/cart', fetcher)
}

export function useAddToCart() {
  const fetcher = (url: string, { arg }) =>
    axios
      .post<ICart>(url, JSON.stringify(arg), {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data) // Fetcher function
  // SWR hook
  return useSWRMutation(baseUrl + '/cart', fetcher)
}
