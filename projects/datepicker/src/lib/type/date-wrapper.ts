export class DateWrapper {

  value: Date;
  selected: boolean;
  today: boolean;
  disabled: boolean;
  weekend: boolean;
  outbound: boolean;

  constructor(value: Date, selected: boolean, today: boolean) {
    this.value = value;
    this.selected = selected;
    this.today = today;
  }
}