import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product.model';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  isCartOpened = false;
  totalAmount: number = 0;
  productsInCart$: Observable<IProduct[]> = new Observable<IProduct[]>();

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productsInCart$ = this.productService.productsInCart$
      .pipe(
        tap((products: IProduct[]) => this.totalAmount = this.productService.getTotalAmount(products))
      );
  }

  openCart(): void {
    this.isCartOpened = !this.isCartOpened;
  }

  removeProduct(product: IProduct): void {
    this.productService.removeProductFromCart(product.id)
  }

}
