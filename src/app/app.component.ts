import { Component } from '@angular/core';

@Component({
  selector: 'dz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dz-datepicker';
  arrival: Date;

  constructor() {
    this.arrival = new Date();
  }
}
