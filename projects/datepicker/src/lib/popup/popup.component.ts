import { Component, OnInit, Input } from '@angular/core';
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

  weekdaysHead: string[];
  tempDate: Date;
  times: Date[][];

  constructor(private _service: DatepickerService) {
    this.weekdaysHead = moment.weekdaysMin(); // TODO: make this locale aware
    this.tempDate = this.selectedDate;
  }

  ngOnInit() {
    this.times = this._service.getCalendar(TimeUnit.DAY, this.tempDate);

    // console.debug('Weekdays: ', this.weekdaysHead);
  }

}
