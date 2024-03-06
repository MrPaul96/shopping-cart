export interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  inCart?: boolean;
}

export interface IProductResponse {
  products: IProduct[];
}
