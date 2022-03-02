import { Stores } from "./Stores.interfaces";

export interface ShoesData {
  count: number,
  shoes: Shoe[],
}
export interface Shoe{
  _id: string,
  name: string,
  img: string,
  price: number,
  brand: string,
  model: string,
  releaseAt: Date,
  releaseYear: string,
  store: Stores,
}
