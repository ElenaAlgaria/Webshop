import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface User{
    email: string;
    name: string;
    imageUrl: string;
}

type AppState = {
    user: User | undefined;
};

const initialState: AppState = {
    user: undefined,
};

export const AppStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store, router = inject(Router)) => ({
        signin:() =>{
            patchState(store,{user: {email:"test@test.com", name:"Jane Doe", imageUrl:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}});
            router.navigate(["/home"]);
        },
        signout:() =>{
        patchState(store,{user: undefined});
        router.navigate(["/sign-in"]);
        }
    })) 
);
