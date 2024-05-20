import { IPrice } from './product'

export interface IShipping {
  method: string
  cost: IPrice
  detail: string
  title: string
  working_days: string
  location: string
}
