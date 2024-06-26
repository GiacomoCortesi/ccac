import { ICart } from './cart'
import { IPrice } from './product'
import { IShipping } from './shipping'

export interface IOrder {
  id: string
  status: IOrderStatus
  date: string
  last_update: string
  completed: boolean
  shipping: IShipping
  paypal_order_id: string
  total: IPrice
  cart: ICart
}

export interface IOrderStatus {
  message: string
  description: string
}

export interface IOrderRequest {
  user_id: string
  shipping: IShipping
}
