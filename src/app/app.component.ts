import { Component } from '@angular/core';
import { TemporalType } from 'datepicker';

@Component({
  selector: 'dz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dzonga Datepicker';
  dob: Date;
  temporal: TemporalType = TemporalType.TIMESTAMP;

  constructor() {
    // this.dob = new Date(1984, 3, 21);

  }
}
