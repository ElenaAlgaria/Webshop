import { CanActivateFn, Router } from '@angular/router';
import { AppStore } from '../app.store';
import { inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

export function redirectLoginIfNotAuthenticated(): CanActivateFn {
  return async (route) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = await authService.getAuthState();

    if (!user) {
      console.log('User not authenticated');
      return router.parseUrl('/sign-in');
    }
    return true;
  };
}

export function redirectHomeIfAuthenticated(): CanActivateFn {
  return async (route) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = await authService.getAuthState();
    
    if (user) {
      return router.parseUrl('/home');
    }
    return true;
  };
}
