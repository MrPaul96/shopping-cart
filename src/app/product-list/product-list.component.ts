import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { map, tap } from 'rxjs/operators';
import { IProduct } from '../product.model';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((products) => this.products = products);
  }

  addProductToCart(product: IProduct): void {
    this.productService.addProductToCart(product);
  }
}
