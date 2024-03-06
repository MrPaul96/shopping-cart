import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IProduct, IProductResponse } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsInCartSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  productsInCart$: Observable<IProduct[]> = this.productsInCartSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.httpClient
      .get<IProductResponse>('../assets/products.json')
      .pipe(map((response) => response.products));
  }

  getTotalAmount(products: IProduct[]): number {
    return products.reduce((sum: number, currentProduct: IProduct) => currentProduct.price + sum, 0);
  }

  setProductsInCart(products: IProduct[]) {
    this.productsInCartSubject.next(products);
  }

  getCurrentProductsInCart() {
    return this.productsInCartSubject.getValue();
  }

  addProductToCart(product: IProduct): void {
    product = { ...product, inCart: true };
    const currentProductsInCart = this.getCurrentProductsInCart();
    const updatedProducts = [...currentProductsInCart, product];
    this.setProductsInCart(updatedProducts);
  }

  removeProductFromCart(id: string): void {
    const currentProductsInCart = this.getCurrentProductsInCart();
    const productsInCart  = currentProductsInCart.filter((product: IProduct) => product.id !== id);
    this.setProductsInCart(productsInCart);
  }
}
