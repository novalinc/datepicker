import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DateWrapper } from '../../type';
import moment from 'moment';

@Component({
  selector: 'dp-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {
  @Input()
  selectedDate: DateWrapper;
  @Input()
  years: any;

  @Output()
  onSelect: EventEmitter<Date>;

  constructor() {
    this.onSelect = new EventEmitter<Date>();
  }

  ngOnInit() {
  }

  keys(years: any): string[] {
    return Object.keys(years);
  }

  pick(wrap: DateWrapper): void {
    console.debug('picking month: ', wrap.value);
    this.selectedDate = wrap;
    this.onSelect.emit(wrap.value);
  }

  setYear(year: number): void {
    if (this.selectedDate instanceof Date) {
      let d: Date = this.selectedDate;

      this.selectedDate.value = moment(d)
        .year(year)
        .toDate();

      console.debug('picking year: %s', year);
      this.onSelect.emit(d);
    } else {
      console.warn('No selected date');
    }
  }
}
