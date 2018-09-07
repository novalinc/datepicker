import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateWrapper } from '../type';
import { DatepickerService } from '../datepicker.service';

@Component({
  selector: 'dp-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() opened: boolean;
  @Input() selectedDate: Date;

  @Output()
  onSelect: EventEmitter<Date>;

  weekdayNames: string[];
  tempDate: Date;
  calendar: DateWrapper[][];

  constructor(private _service: DatepickerService) {
    this.weekdayNames = _service.getWeekdayNames();
    this.tempDate = this.selectedDate;
    this.onSelect = new EventEmitter<Date>();
  }

  ngOnInit() {
    this.calendar = this._service.getCalendar(this.tempDate);
  }

  onPick(date: Date): void {
    if (this.selectedDate !== date) {
      console.info('pre-change event: %s', this.selectedDate);
      this.selectedDate = date;
      this.onSelect.emit(date);
    } else {
      console.info('no pre-change event');
    }
  }
}
