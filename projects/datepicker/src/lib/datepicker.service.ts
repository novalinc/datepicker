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

  /**
   * @param selectedDate preselected dated
   * @param min minimum selectable year
   * @param max maximum selectable year
  */
  getYearsAndMonths(selectedDate: DateWrapper, min: number, max): any {

    let current = selectedDate ? selectedDate.value : new Date();
    let t = moment(current)
      .year(min);

    let years = {}

    for (let yy = min; yy <= max; yy++) {
      years[yy] = [];
      for (let m = 0; m < 12; m++) {
        years[yy]
          .push(new DateWrapper(t.date(1).year(yy).month(m).toDate(), t.isSame(current, 'month')));
      }
    }
    return years;
  }

  getWeekdayNames(): string[] {
    return moment.weekdaysMin(); // TODO: make this locale aware
  }
}
