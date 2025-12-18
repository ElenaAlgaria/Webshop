import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../buttons/primary-button/primary-button.component';
import { RouterLink } from '@angular/router';
import { SecondaryButtonComponent } from '../buttons/primary-button/secondary-button.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { SignInComponent } from '../sign-in/sign-in-dialog.component';
import { AppStore } from '../../app.store';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../shared/services/cart.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconButton, MatButton } from '@angular/material/button';
@Component({
  selector: 'app-header',
  imports: [
    PrimaryButtonComponent,
    RouterLink,
    SecondaryButtonComponent,
    MatMenu,
    MatMenuTrigger,
    MatIcon,
    MatDividerModule,
    MatIconButton,
    MatButton
],
  template: `
    <div
      class="bg-slate-100 px-6 py-3 shadow-md flex justify-between items-center"
    >
      <button class="cursor-pointer" routerLink="/">
        <img
          src="images/logo.png"
          alt="Logo"
          class="h-20 w-auto object-contain"
        />
      </button>
      <div flex="1" class="flex justify-items-start items-center gap-4">
        <div class="relative inline-block">
          <button mat-icon-button class="large-icon-btn" routerLink="/cart" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </button>
          <span
            class="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full px-1.5 py-0.5"
            >{{ cartService.cart().length }}</span
          >
        </div>
      
    
        @if (appstore.user(); as user) {

        <button mat-icon-button class="large-icon-btn" [mat-menu-trigger-for]="profileMenu">
          <img
            [src]="appstore.user()?.photoUrl"
            class=" rounded-full object-cover"
          />
        </button>
        <mat-menu #profileMenu="matMenu" xPosition="before">
          <div class="flex flex-col px-3 min-w-[200px]">
            <span class="text-sm font-medium">{{ user.name }}</span>
            <span class="text-xs text-gray-500">{{ user.email }}</span>
          </div>
          <mat-divider></mat-divider>
          <button class="min-h-8 cursor-pointer" mat-menu-item (click)="appstore.signOut()">
            <span class="px-3 flex items-center space-x-2">
            <mat-icon>logout</mat-icon> 
              <span>Sign out</span>
            </span>
          </button>
        </mat-menu>
        } @else{
        <app-secondary-button
          label="Sign in"
          class="w-max"
          (btnClicked)="signIn()"
        ></app-secondary-button>
        <app-primary-button label="Sign up" class="w-max"></app-primary-button>

        }
      </div>
    </div>
  `,
  styles: ``,
})
export class HeaderComponent {
  cartService = inject(CartService);

  appstore = inject(AppStore);

  md = inject(MatDialog);

  signIn() {
    this.md.open(SignInComponent, {
      disableClose: true,
    });
  }
}
