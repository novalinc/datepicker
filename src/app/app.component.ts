import { Component } from '@angular/core';

@Component({
  selector: 'nl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nl-datepicker';
  arrival: Date;

  constructor() {
    this.arrival = new Date();
  }
}
