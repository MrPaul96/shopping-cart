import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { IProduct, IProductResponse } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsInCart: IProduct[] = [];

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.httpClient
      .get<IProductResponse>('../assets/products.json')
      .pipe(map((response) => response.products));
  }

  getProductsFromCart() {
    return [...this.productsInCart];
  }

  addProductToCart(product: IProduct): void {
    this.productsInCart = [...this.productsInCart, product];
  }

  removeProductFromCart(id: string): void {
    this.productsInCart = this.productsInCart.filter((product: IProduct) => product.id !== id);
  }
}
