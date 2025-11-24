import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <app-header/>
    <router-outlet />
  `,
  styles: ``
})
export class LayoutComponent {

}
