import * as moment from "moment";

export class DateModel {
  active: boolean; //current time
  selected: boolean;
  disabled: boolean;

  constructor(moment: moment.Moment, active?: boolean, selected?: boolean, disabled?: boolean) {
    this.moment = moment;
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

  getMoment(): moment.Moment {
    return this.moment;
  }

  private moment: moment.Moment;
}
