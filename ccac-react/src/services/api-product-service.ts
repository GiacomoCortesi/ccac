import axios from 'axios'
import useSWR from 'swr'
import { IProduct } from '../models/product'
import { useState } from 'react'

export const baseUrl = import.meta.env.VITE_API_BASE_URL

export function useGetAllProducts() {
  const fetcher = (url: string) =>
    axios
      .get<IProduct[]>(url, { withCredentials: true })
      .then((res) => res.data)
  return useSWR(`${baseUrl}/product`, fetcher)
}

export function useGetProduct(id: string | undefined) {
  const fetcher = (url: string) =>
    axios.get<IProduct>(url, { withCredentials: true }).then((res) => res.data)
  return useSWR(`${baseUrl}/product/${id}`, fetcher)
}

export function useDeleteProduct() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<any>(null)

  const deleteProduct = async (id: string) => {
    setIsDeleting(true)
    setError(null)
    try {
      await axios.delete(`${baseUrl}/product/${id}`)
    } catch (err) {
      console.error('Failed to delete product:', err)
      setError(err as any)
    } finally {
      setIsDeleting(false)
    }
  }

  return { deleteProduct, error, isDeleting }
}

export function useCreateProduct() {
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<any>(null)

  const createProduct = async (product: IProduct) => {
    setIsCreating(true)
    setError(null)
    try {
      await axios.post(`${baseUrl}/product`, product)
    } catch (err) {
      setError(err as any)
    } finally {
      setIsCreating(false)
    }
  }

  return { createProduct, error, isCreating }
}

export function useEditProduct() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<any>(null)

  const editProduct = async (id: string, product: IProduct) => {
    setIsUpdating(true)
    setError(null)
    try {
      await axios.patch(`${baseUrl}/product/${id}`, product)
    } catch (err) {
      setError(err as any)
    } finally {
      setIsUpdating(false)
    }
  }

  return { editProduct, error, isUpdating }
}
