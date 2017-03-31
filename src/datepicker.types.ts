import * as moment from "moment";

export const enum TimeUnit {
  YEAR = 0,
  MONTH = 1,
  DAY = 2,
  HOUR = 3,
  MINUTE = 4
}

export class DateModel {
  active: boolean; //current time
  selected: boolean;
  disabled: boolean;

  constructor(moment: moment.Moment, active?: boolean, selected?: boolean, disabled?: boolean) {
    this._moment = moment;
    this.active = active;
    this.disabled = (disabled === undefined) ? false : disabled;
    this.selected = selected;
  }

  year(): number {
    return this.moment.year();
  }

  monthOfYear(): string {
    return this.moment.format("MMM");
  }

  dayOfMonth(): number {
    return this.moment.date();
  }

  hourOfDay(): string {
    return this.moment.format("HH:00");
  }

  minuteOfHour(): string {
    return this.moment.format("HH:mm");
  }

  get moment(): moment.Moment {
    return this._moment;
  }

  private _moment: moment.Moment;
}

export class DatepickerOptions {
  future: boolean;
  locale: string; //en-ZA
  use24Hour: boolean;
  minDate: Date;
  maxDate: Date;
  temporal: string; // date, time, dateTime
  past: boolean;

  constructor() {
    this.locale = "en-ZA";
    this.use24Hour = false;
    this.temporal = "date";
  }
}
