import { Component, input, output} from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  template: `
   <button class="bg-blue-500 text-white text-lg w-max px-5 py-2 rounded-xl hover:opacity-90" [disabled]="disabled()" (click)="btnClicked.emit()">
    {{label()}}
   </button>
  `,
  styles: ``
})
export class PrimaryButtonComponent {
  label = input('');
  disabled = input(false);
  btnClicked = output();
}
