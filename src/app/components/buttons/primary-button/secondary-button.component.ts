import { Component, input, output} from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  imports: [],
  template: `
   <button class=" cursor-pointer text-black text-lg w-max px-5 py-2 rounded-xl hover:bg-gray-200 transition" [disabled]="disabled()" (click)="btnClicked.emit()">
    {{label()}}
   </button>
  `,
  styles: ``
})
export class SecondaryButtonComponent {
  label = input('');
  disabled = input(false);
  btnClicked = output();
}
