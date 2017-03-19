import { Component } from '@angular/core';

import { DateModel } from "./picker/types";

import * as moment from "moment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Novalinc Datepicker";
  alarm: DateModel;
  arrival: DateModel;
  dateOfBirth: DateModel;
  departure: DateModel;
  meeting: DateModel;


  constructor() {
    // this.meeting = new DateModel(moment());
  }
}
