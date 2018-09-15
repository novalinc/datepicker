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

    console.debug('Generate calendar: ', selectedDate);

    let day = [[], [], [], [], [], []];
    let now = new Date();
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        let tmp = new DateWrapper(
          t.toDate(),
          t.isSame(selectedDate, 'day'), // Selected
          t.isSame(now, 'day')); // Today

        tmp.weekend = (t.weekday() === 0) || (t.weekday() === 6);
        tmp.outbound = !t.isSame(selectedDate, 'month');

        day[i].push(tmp); // Weekend
        t = t.add(1, 'day');
      }
    }
    return day;
  }

  /**
   * @param selectedDate preselected dated
   * @param min minimum selectable year
   * @param max maximum selectable year
  */
  getYearsAndMonths(selectedDate: Date, min: number, max): any {

    let t = moment(selectedDate)
      .year(min);

    console.debug('generate year months from %d to %d', min, max);

    let years = {}
    let now = new Date();
    for (let yy = min; yy <= max; yy++) {
      years[yy] = [];
      for (let m = 0; m < 12; m++) {
        years[yy]
          .push(new DateWrapper(
            t.date(1).year(yy).month(m).toDate(),
            t.isSame(selectedDate, 'month'),
            t.isSame(now, 'month')
          ));
      }
    }
    return years;
  }

  getWeekdayNames(): string[] {
    console.debug('Getting weekday names');
    return moment.weekdaysMin(); // TODO: make this locale aware
  }
}
