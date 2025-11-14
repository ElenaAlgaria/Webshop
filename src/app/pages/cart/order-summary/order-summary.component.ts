import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/buttons/primary-button/primary-button.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent, NgFor],
  template: `
    <div class="bg-white p-6 mt-5 w-4xl rounded-xl border border-gray-300">
      <div class="flex flex-col gap-4">
        <h2 class="text-3xl font-bold">Order Summary</h2>

        <div class="flex flex-col gap-1">
          <span *ngFor="let price of calculateTotal" class="text-lg flex-col">{{
            '+ $' + price.toFixed(2)
          }}</span>
      <hr class="border-1 m-0"/>
        </div>

        <span class="text-2xl font-bold">{{ 'Total ' + '$' + total() }}</span>

        <app-primary-button
          label="Proceed to checkout"
          class="self-end"
        ></app-primary-button>
      </div>
    </div>
  `,
  styles: ``,
})
export class OrderSummaryComponent {
  get calculateTotal(): number[] {
    return this.cartService.cart().map((item) => item.price);
  }

  cartService = inject(CartService);

  total = computed(() => {
    let total = 0;
    for (const item of this.cartService.cart()) {
      total += item.price;
    }
    return total.toFixed(2);
  });
}
