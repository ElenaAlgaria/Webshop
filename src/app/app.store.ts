import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AuthService } from './shared/services/auth.service';

type AppState = {};

const initialState: AppState = {};

export const AppStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withComputed((store, authService = inject(AuthService)) =>({
        user: computed(()=> authService.user())
    })),
    withMethods((store, router = inject(Router), authService = inject(AuthService)) => ({
        signIn:async (email: string, password: string) =>{
            await authService.signIn(email, password);
            router.navigate(["/home"]);
        },
        signOut:async () =>{
        await authService.signOut();
        router.navigate(["/sign-in"]);
        }
    })) 
);
