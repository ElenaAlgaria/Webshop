import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/product';
import { PrimaryButtonComponent } from "../../../components/buttons/primary-button/primary-button.component";
import { AppStore } from '../../../app.store';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent],
  template: `
    <div
      class="bg-white drop-shadow-sm rounded-xl p-6 flex-col gap-6 relative"
    >
        <img
          [src]="product().image"
          class="w-[200px] h-[200px] object-contain mx-auto"
        />
        <div class="flex flex-col mt-2">
          <span class="text-md font-bold">{{product().title}}</span>
          <span class="text-sm">{{'$' + product().price}}</span>
          <app-primary-button label="Add to cart" class="mt-3 w-max self-end" (btnClicked)=" cartService.addToCart(product())" [disabled]="!product().stock"
          [class]="product().stock ? '' : 'bg-gray-300 rounded-xl cursor-not-allowed opacity-50'"></app-primary-button>
        </div>
        <span class="absolute top-2 right-3 text-sm font-bold" [class]="product().stock ? 'text-green-500' : 'text-red-500'">
          @if (product().stock) {
            {{product().stock}} left
          } @else {
            Out of stock
          }
        </span>
      </div>
    
  `,
  styles: ``,
})
export class ProductCardComponent {
  appStore = inject(AppStore);
  cartService = inject(CartService);
  product = input.required<Product>();
}
