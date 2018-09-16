import { Injectable } from '@angular/core';
import { DateWrapper } from '../type';
import moment from 'moment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatepickerService {

  constructor() {
    this._valueSubject = new BehaviorSubject<Date>(null);
    this._valueEvent$ = this._valueSubject.asObservable();
    this._pickSubject = new BehaviorSubject<Date>(null);
    this._pickEvent$ = this._pickSubject.asObservable();
  }

  getCalendar(): DateWrapper[][] {

    const currentVal = this._pickSubject.getValue();

    let t = moment(currentVal)
      .date(1)
      .startOf('week');

    console.debug('Generate calendar: ', currentVal);

    let day = [[], [], [], [], [], []];
    let now = new Date();
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        let tmp = new DateWrapper(
          t.toDate(),
          t.isSame(currentVal, 'day'), // Selected
          t.isSame(now, 'day')); // Today

        tmp.weekend = (t.weekday() === 0) || (t.weekday() === 6);
        tmp.outbound = !t.isSame(currentVal, 'month');

        day[i].push(tmp); // Weekend
        t = t.add(1, 'day');
      }
    }
    return day;
  }

  /**
   * @param min minimum selectable year
   * @param max maximum selectable year
  */
  getYearsAndMonths(min: number, max): any {

    const currentVal = this._pickSubject.getValue();

    if (currentVal == null) {
      console.debug('Cannot get years & months, no date to work from');
      return null;
    }

    let t = moment(currentVal)
      .year(min);

    console.debug('generate year months from %d to %d', min, max);

    let years = {}
    let now = new Date();
    let dayOfMonth = t.date() > 28 ? 28 : t.date(); // Restrict to the shortest month (moment issue)
    for (let yy = min; yy <= max; yy++) {
      years[yy] = [];
      for (let m = 0; m < 12; m++) {
        years[yy]
          .push(new DateWrapper(
            t.date(dayOfMonth).year(yy).month(m).toDate(),
            t.isSame(currentVal, 'month'),
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

  get value$(): Observable<Date> {
    return this._valueEvent$;
  }

  get pick$(): Observable<Date> {
    return this._pickEvent$;
  }

  setValue(date: Date): void {
    this._valueSubject.next(date);
  }

  pickDate(date: Date): void {
    this._pickSubject.next(date);
  }

  get pickedDate(): Date {
    return this._pickSubject.getValue();
  }

  private _valueEvent$: Observable<Date>;
  private _valueSubject: BehaviorSubject<Date>;
  private _pickEvent$: Observable<Date>;
  private _pickSubject: BehaviorSubject<Date>;
}
