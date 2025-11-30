import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialogClose } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatFormField,
  MatPrefix,
  MatSuffix,
  MatError,
} from '@angular/material/form-field';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { AppStore } from '../../app.store';


@Component({
  selector: 'app-sign-in',
  standalone: true, 
  imports: [
    MatIconButton,
    MatIcon,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatPrefix,
    MatSuffix,
    MatButton,
    MatError,
    ReactiveFormsModule,
    CommonModule
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

      <div *ngIf="errorMessage()" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm" role="alert">
        <span class="block sm:inline">{{ errorMessage() }}</span>
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
          <mat-error *ngIf="signInForm.get('email')?.hasError('required')">
            Email is required
          </mat-error>
          <mat-error *ngIf="signInForm.get('email')?.hasError('email')">
            Enter a valid email
          </mat-error>
        </mat-form-field>

        <mat-form-field class="mb-6 w-full">
          <input
            matInput
            placeholder="Enter your password"
            [type]="passwordVisible() ? 'text' : 'password'"
            formControlName="password"
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
          <mat-error *ngIf="signInForm.get('password')?.hasError('required')">
            Password is required
          </mat-error>
        </mat-form-field>

        <button mat-flat-button color="primary" class="w-full mt-3">
          Sign In
        </button>
      </form>
    </div>
  `,
  styles: ``,
})
export class SignInComponent {
  appstore = inject(AppStore);
  fb = inject(FormBuilder);

  passwordVisible = signal(false);

  errorMessage = signal<string | null>(null); 

  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  async signIn() {
    this.errorMessage.set(null); 
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;

    try {
      await this.appstore.signIn(email!, password!); 

    } catch (error: any) {
      let message = 'An unknown error occurred.';

      // Firebase Fehlercodes überprüfen
      if (error?.code === 'auth/invalid-credential') {
        message = 'Ungültige E-Mail oder Passwort. Bitte versuchen Sie es erneut.';
      } else if (error?.code === 'auth/user-disabled') {
        message = 'Dieser Benutzer wurde gesperrt.';
      } else if (error?.code === 'auth/wrong-password') {
         message = 'Das eingegebene Passwort ist falsch.';
      } else {
        message = error?.message || message;
      }
      
      this.errorMessage.set(message);
    }
  }
}