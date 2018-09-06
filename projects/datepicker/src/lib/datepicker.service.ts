import { Injectable } from '@angular/core';
import { TimeUnit } from './type';
// import * as moment from 'moment';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DatepickerService {

  constructor() { }

  getCalendar(timeUnit: TimeUnit, selectedDate: Date): Date[][] {
    const now = moment();

    switch (timeUnit) {

      case TimeUnit.YEAR: {
        let t = moment(now).add(-5, 'year');

        let years = [[], [], []];

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 5; j++) {
            years[i].push(t.toDate());
            t = t.add(1, 'year');
          }
        }
        return years;
      }

      case TimeUnit.MONTH: {
        let t = moment(now).add(-5, 'month');

        let months = [[], [], []];

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 5; j++) {
            months[i].push(t.toDate());
            t = t.add(1, 'month');
          }
        }
        return months;
      }

      case TimeUnit.DAY: {
        let t = moment(now)
          .date(1)
          .startOf('week');

        let day = [[], [], [], [], [], []];

        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 7; j++) {
            day[i].push(t.toDate());
            t = t.add(1, 'day');
          }
        }
        return day;
      }

      case TimeUnit.HOUR: {
        let t = moment(now).hour(0);

        let hour = [[], [], [], [], [], []];

        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 7; j++) {
            hour[i].push(t.toDate());
            t = t.add(1, 'hour');
          }
        }
        return hour;
      }

      default: {
        console.error('Unknown TimeUnit: %s', timeUnit);
        return null;
      }
    }
  }

}
