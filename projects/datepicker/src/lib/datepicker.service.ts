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

    let times: Array<Array<Date>> = [];

    switch (timeUnit) {

      case TimeUnit.YEAR: {
        let t = moment(now).add(-5, 'year');
        
        let years = [[], [], []];

        for ( let i = 0; i < 3; i++) {
          for (let j = 0; j < 5; j++) {
            let date = t.add(1, 'year').toDate();
            years[i].push(date); 
          }
        }
        return years;
      }
      case TimeUnit.MONTH: {
        let t = moment(now).add(-5, 'month');
        
        let months = [[], [], []];

        for ( let i = 0; i < 3; i++) {
          for (let j = 0; j < 5; j++) {
            let date = t.add(1, 'month').toDate();
            months[i].push(date); 
          }
        }
        return months;
      }
      case TimeUnit.DAY: {
        let t = moment(now).date(1);
        
        let day = [[], [], [], [], [], []];

        for ( let i = 0; i < 6; i++) {
          for (let j = 0; j < 7; j++) {
            let date = t.add(1, 'day').toDate();
            day[i].push(date); 
          }
        }
        return day;
      }
      case TimeUnit.HOUR: {
        let t = moment(now).hour(0);
        
        let hour = [[], [], [], [], [], []];

        for ( let i = 0; i < 6; i++) {
          for (let j = 0; j < 7; j++) {
            let date = t.add(1, 'hour').toDate();
            hour[i].push(date); 
          }
        }
        return hour;
      }
      default: {
        
      } break;
    }
  }

}
