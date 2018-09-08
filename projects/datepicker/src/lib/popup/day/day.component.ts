import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DateWrapper } from '../../type';
import { DatepickerService } from '../../datepicker.service';

@Component({
  selector: 'dp-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input()
  selectedDate: DateWrapper;

  weekdayNames: string[];
  calendar: DateWrapper[][];

  @Output()
  onSelect: EventEmitter<Date>;

  constructor(private _service: DatepickerService) {
    this.onSelect = new EventEmitter<Date>();
    this.weekdayNames = _service.getWeekdayNames();
  }

  ngOnInit() {
    this.calendar = this._service.getCalendar(this.selectedDate.value);
  }

  pick(wrap: DateWrapper): void {
    console.debug('picking day: ', wrap.value);
    this.onSelect.emit(wrap.value);
  }
}
