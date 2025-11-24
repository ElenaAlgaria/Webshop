import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/buttons/primary-button/primary-button.component';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../../../components/sign-in/sign-in-dialog.component';

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent, NgFor],
  template: `
    <div class="bg-white p-6 mt-5 sm:px-8 lg:w-4xl rounded-xl drop-shadow-sm">
      <div class="flex flex-col gap-4">
        <h2 class="text-xl font-bold">Order Summary</h2>

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
          (btnClicked)="proceedToCheckout()"
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


  md = inject(MatDialog);

  proceedToCheckout() {
   this.md.open(SignInComponent,{
      disableClose: true
    });
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
