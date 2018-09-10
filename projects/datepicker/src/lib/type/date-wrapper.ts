export class DateWrapper {

  value: Date;
  selected: boolean;
  today: boolean;
  disabled: boolean;
  weekend: boolean;

  constructor(value: Date, selected: boolean, today: boolean, disabled?: boolean, weekend?: boolean) {
    this.value = value;
    this.selected = selected;
    this.today = today;
    this.disabled = disabled;
    this.weekend = weekend;
  }
}