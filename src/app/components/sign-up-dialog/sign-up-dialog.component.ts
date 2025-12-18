import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from "@angular/material/form-field";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-sign-up-dialog',
  imports: [MatCardModule, MatIcon, MatFormField,  MatFormFieldModule,
  MatInputModule],
  template: `
    <div class="mx-auto max-w-[1200px] py-6">

    <h1 class="text-3xl font-extrabold mb-4">Sign Up</h1>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div class="lg:col-span-3 flex flex-col gap-6">


        
        <mat-card class="p-6 rounded-2xl">
          <mat-card-header class="mb-4">
            <mat-card-title class="flex items-center gap-2 text-lg font-semibold">
              <mat-icon>local_shipping</mat-icon>
              Shipping Information
            </mat-card-title>
          </mat-card-header>
          
          <mat-card-content>
            <form class="grid grid-cols-2 gap-4">
              <mat-form-field>
                <input matInput placeholder="First Name" />
              </mat-form-field>
              
              <mat-form-field>
                <input matInput placeholder="Last Name" />
      </mat-form-field>
      
      <mat-form-field class="col-span-2">
        <textarea matInput placeholder="Address"></textarea>
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="City" />
      </mat-form-field>
      
      <mat-form-field>
        <input matInput placeholder="State" />
      </mat-form-field>
      
      <mat-form-field class="col-span-2">
        <input matInput placeholder="Zip" />
      </mat-form-field>
    </form>
  </mat-card-content>
</mat-card>

</div>
`,
  styles: ``
})
export class SignUpDialogComponent {

}
