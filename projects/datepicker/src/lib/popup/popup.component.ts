import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateWrapper, TemporalType } from '../type';
import { DatepickerService } from '../datepicker.service';

@Component({
  selector: 'dp-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() opened: boolean;
  @Input() selectedDate: Date;
  @Input() temporal: TemporalType;
  @Input() weekdayNames: string[];

  @Output()
  onSelect: EventEmitter<Date>;

  years: any;
  calendar: DateWrapper[][];

  constructor(private _service: DatepickerService) {
    this.onSelect = new EventEmitter<Date>();

  }

  ngOnInit() {

    switch (this.temporal) {
      case TemporalType.DATE:
      case TemporalType.TIMESTAMP:
        this.weekdayNames = this._service.getWeekdayNames();
        this.calendar = this._service.getCalendar(this.selectedDate);
        break;
      case TemporalType.TIME:
    }
  }

  toggleYearView(): boolean {

    let view = this._yearView = !this._yearView;

    if (view) {
      this.years = this._service.getYearsAndMonths(this.selectedDate, 1970, 2020);
    }

    return view;
  }

  get yearView(): boolean {
    return this._yearView;
  }

  onPickDay(dateEvent: Date): void {

    if (this.selectedDate !== dateEvent) {
      this.selectedDate = dateEvent;
      console.debug('pre-change event: ', this.selectedDate);
      this.onSelect.emit(dateEvent);
    } else {
      console.debug('no pre-change event');
    }
  }

  onPickMonth(dateEvent: Date): void {
    this._yearView = false;
    this.selectedDate = dateEvent;
    this.calendar = this._service.getCalendar(dateEvent);
  }

  private _yearView: boolean;
}
