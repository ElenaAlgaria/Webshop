import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";

// create cart items list using at for loop
//create remove button

/*<li> {{cartItem.title}}, {{'$'+cartItem.price}} <app-primary-button label="Remove" class="mt-3"
 (btnClicked)="cartService.removeFromCart(cartItem.id)"/></li>*/

@Component({
  selector: 'app-cart',
  imports: [PrimaryButtonComponent, CartItemComponent, OrderSummaryComponent],
  template: `
    
  <div class="p-6 flex flex-col gap-4">

    @for (cartItem of cartService.cart(); track cartItem.id) {
      <app-cart-item [item]="cartItem"/>
    }
    <app-order-summary class="self-center"></app-order-summary>
  </div>
      

      `,
  styles: ``
})
export class CartComponent {
    cartService = inject(CartService);
}
