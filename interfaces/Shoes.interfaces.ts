export interface ShoesData {
  count: number,
  shoes: Shoe[],
}
export interface Shoe{
  _id?: string,
  name?: string,
  img?: string,
  price?: number,
  brand?: string,
  model?: string,
  releaseAt?: Date,
  store: string,
}
