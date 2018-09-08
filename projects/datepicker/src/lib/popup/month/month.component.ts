import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DateWrapper } from '../../type';
import { DatepickerService } from '../../datepicker.service';

@Component({
  selector: 'dp-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {
  @Input()
  selectedDate: DateWrapper;

  @Output()
  onSelect: EventEmitter<Date>;

  years: any;

  constructor(private _service: DatepickerService) {
    this.onSelect = new EventEmitter<Date>();
  }

  ngOnInit() {
    this.years = this._service.getYearsAndMonths(this.selectedDate, 1970, 2020);
  }

  keys(years: any): string[] {
    return Object.keys(years);
  }

  pick(wrap: DateWrapper): void {
    console.debug('picking month: ', wrap.value);
    this.selectedDate = wrap;
    this.onSelect.emit(wrap.value);
  }
}
