import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeUnit } from '../type';
import moment from 'moment';
import { DatepickerService } from '../datepicker.service';

@Component({
  selector: 'dp-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() opened: boolean;
  @Input() selectedDate: Date;
  @Input() timeUnit: TimeUnit;

  @Output()
  onSelectDate: EventEmitter<Date>;

  weekdaysHead: string[];
  tempDate: Date;
  times: Date[][];

  constructor(private _service: DatepickerService) {
    this.weekdaysHead = moment.weekdaysMin(); // TODO: make this locale aware
    this.tempDate = this.selectedDate;
    this.onSelectDate = new EventEmitter<Date>();
  }

  ngOnInit() {
    this.times = this._service.getCalendar(TimeUnit.DAY, this.tempDate);

    // console.debug('Weekdays: ', this.weekdaysHead);
  }

  onPick(date: Date): void {
    if (this.selectedDate !== date) {
      console.info('onChange event: %s != %s', this.selectedDate, date);
      this.selectedDate = date;
      this.onSelectDate.emit(date);
    } else {
      console.info('noChange');
    }
  }
}
