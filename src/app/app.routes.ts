import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { SignInComponent } from './components/sign-in/sign-in-dialog.component';
import { redirectHomeIfAuthenticated, redirectLoginIfNotAuthenticated } from './guards/auth.guards';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [redirectHomeIfAuthenticated()]
  },
  
  {
    path: '',
    component: LayoutComponent,
    canActivate: [redirectLoginIfNotAuthenticated()],
    children: [
      {
        path: 'home',
        component: ProductsListComponent,
      },
        {
        path: 'cart',
        component: CartComponent,
      }
    ],
  },
];
