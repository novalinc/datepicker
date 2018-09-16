import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DateWrapper } from '../../type';
import moment from 'moment';
import { DatepickerService } from '../../service/datepicker.service';

@Component({
  selector: 'dp-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  years: any;

  @Output()
  onSelect: EventEmitter<Date>;

  constructor(private _service: DatepickerService) {
    this.onSelect = new EventEmitter<Date>();
  }

  ngOnInit() {
    this.years = this._service.getYearsAndMonths(1969, 2020);
  }

  keys(years: any): string[] {
    return Object.keys(years).reverse();
  }

  pick(wrap: DateWrapper): void {
    console.debug('picking month: ', wrap.value);
    this._service.pickDate(wrap.value);
    this.onSelect.emit(wrap.value);
  }

  setYear(year: number): void {

    let yearMonth = moment(this._service.pickedDate)
      .year(year)
      .toDate();

    console.debug('picking year: %s', year);
    this._service.pickDate(yearMonth);
    this.onSelect.emit(yearMonth);

  }
}
