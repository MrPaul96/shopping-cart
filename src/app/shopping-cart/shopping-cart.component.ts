import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  isCartOpened = false;

  constructor(private productService: ProductService){}

  openCart() {
    this.isCartOpened = !this.isCartOpened;
  }
}
