import * as moment from "moment";

export enum TimeUnit {
  YEAR = 0,
  MONTH = 1,
  DAY = 2,
  HOUR = 3,
  MINUTE = 4
}

export enum TemporalType {
  DATE, TIME, TIMESTAMP
}

export class DateModel {
  active: boolean; //current time
  selected: boolean;
  disabled: boolean;
  agendars: Array<string>;

  constructor(moment: moment.Moment, active?: boolean, selected?: boolean, disabled?: boolean) {
    this._moment = moment;
    this.active = active;
    this.disabled = (disabled === undefined) ? false : disabled;
    this.selected = selected;
    this.agendars = [];
  }

  get moment(): moment.Moment {
    return this._moment;
  }

  private _moment: moment.Moment;
}

export class Event {
  agendar: string;
  date: Date;
  type: string;

  constructor(agender: string, date: Date, type?: string) {
    this.agendar = agender;
    this.date = date;
    this.type = type;
  }
}

export class DatepickerOptions {
  future: boolean;
  disabled: boolean;
  disabledDates: Array<Date>;
  publicHolidays: Array<Event>;
  locale: string;
  minDate: Date;
  maxDate: Date;
  past: boolean;
  placeholder: string;
  required: boolean;
  temporal: TemporalType;
  use24Hour: boolean;

  constructor() {
    this.locale = moment.locale();
    this.use24Hour = false;
    this.temporal = TemporalType.DATE;
    this.placeholder = "";
    this.publicHolidays = [];
  }
}
