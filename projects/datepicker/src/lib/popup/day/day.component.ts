import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DateWrapper } from '../../type';
import { TemporalType } from '../../type';
import { DatepickerService } from '../../service/datepicker.service';

@Component({
  selector: 'dp-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input()
  temporal: TemporalType;

  @Output()
  onSelect: EventEmitter<Date>;

  calendar: DateWrapper[][];
  weekdayNames: string[];

  constructor(private _service: DatepickerService) {
    this.onSelect = new EventEmitter<Date>();
  }

  ngOnInit() {
    if (this.temporal !== TemporalType.TIME) {
      this._service.pick$.subscribe((initDate) => {
        console.debug('Change Detected, generating new calendar %s', initDate);
        this.weekdayNames = this._service.getWeekdayNames();
        this.calendar = this._service.getCalendar();
      });
    } else {
      console.debug('Time (%s) temporal selected', this.temporal);
    }
  }

  pick(wrap: DateWrapper): void {
    console.debug('picking day: ', wrap.value);
    this.onSelect.emit(wrap.value);
  }
}
