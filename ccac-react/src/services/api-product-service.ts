import axios from 'axios'
import useSWR from 'swr'
import { IProduct } from '../models/product'
import { useFetch } from '../utils/useFetch'

export const baseUrl = import.meta.env.VITE_API_BASE_URL

export function useGetAllProducts() {
  const fetcher = (url: string) =>
    axios
      .get<IProduct[]>(url, { withCredentials: true })
      .then((res) => res.data)
  return useSWR(baseUrl + `/product`, fetcher)
}

export function useGetProduct(id: string | undefined) {
  const fetcher = (url: string) =>
    axios.get<IProduct>(url, { withCredentials: true }).then((res) => res.data)
  return useSWR(baseUrl + `/product/${id}`, fetcher)
}

export function useCreateProduct(product: IProduct) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  }
  return useFetch(baseUrl + '/product', options)
}
