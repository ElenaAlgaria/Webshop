import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialogClose } from '@angular/material/dialog';
import { signalStore, patchState } from '@ngrx/signals';

import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormField,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { SignInParams } from '../../models/user';

@Component({
  selector: 'app-sign-in',
  imports: [
    MatIconButton,
    MatIcon,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatPrefix,
    MatSuffix,
    MatButton,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign in</h2>
          <p class="text-sm text-gray-500 mb-6">
            Sign in to your account to continue shopping
          </p>
        </div>
        <button
          tabindex="-1"
          mat-icon-button
          class="-mt-2 -mr-2"
          mat-dialog-close
        >
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form [formGroup]="signInForm" (ngSubmit)="signIn()">
        <mat-form-field class="mb-2 w-full">
          <input
            matInput
            placeholder="Enter your email"
            type="email"
            formControlName="email"
          />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>

        <mat-form-field class="mb-6 w-full">
          <input
            matInput
            formControlName="password"
            placeholder="Enter your password"
            [type]="passwordVisible() ? 'text' : 'password'"
          />
          <mat-icon matPrefix>lock</mat-icon>
          <button
            matSuffix
            matIconButton
            type="button"
            class="mr-2"
            (click)="passwordVisible.set(!passwordVisible())"
          >
            <mat-icon
              [fontIcon]="passwordVisible() ? 'visibility_off' : 'visibility'"
            ></mat-icon>
          </button>
        </mat-form-field>

        <button type="submit" mat-flat-button color="primary" class="w-full">
          Sign In
        </button>
      </form>
    </div>
  `,
  styles: ``,
})
export class SignInComponent {

  store = signalStore({
    user: undefined
  })

  fb = inject(NonNullableFormBuilder);

  passwordVisible = signal(false);

  signInForm = this.fb.group({
    email: ['test', Validators.required],
    password: ['test123', Validators.required],
  });

  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.signInForm.value;

    // this.store.signInStore({email, password} as SignInParams);
    patchState(this.store,{
      user:{
        id:'1',
        email,
        name:'Jane Doe',
        imageUrl:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
      }
    }
    )
  }
}
