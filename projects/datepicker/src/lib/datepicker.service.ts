import { Injectable } from '@angular/core';
import { DateWrapper } from './type';
// import * as moment from 'moment';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DatepickerService {

  constructor() { }

  getCalendar(selectedDate: Date): DateWrapper[][] {
    let t = moment(selectedDate)
      .date(1)
      .startOf('week');

    let day = [[], [], [], [], [], []];

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        day[i].push(new DateWrapper(t.toDate(), t.isSame(selectedDate, 'day'), false,
          t.weekday() === 0 || t.weekday() === 6));
        t = t.add(1, 'day');
      }
    }
    return day;
  }

  getWeekdayNames(): string[] {
    return moment.weekdaysMin(); // TODO: make this locale aware
  }
}
