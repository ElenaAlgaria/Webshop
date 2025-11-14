import { Component, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductCardComponent } from "./product-card/product-card.component";

/* 
  loaders, notification, 
  angular forms
  filter, categories
*/

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `
  <div class="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    @for (product of products(); track product.id) {
      <app-product-card [product]="product"></app-product-card>
    }
  </div>
  `,
  styles: ``
})
export class ProductsListComponent {

  async ngOnInit() {
    const res = await fetch('https://fakestoreapi.com/products');
    const data: Product[] = await res.json();
    const dataWithStock = data.map(product =>({...product, stock: Math.floor(Math.random() * 10)}));
     this.products.set(dataWithStock);
  }

   products = signal<Product[]>([
 
  ]); 
}