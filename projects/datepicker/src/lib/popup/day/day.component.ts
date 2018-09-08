import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DateWrapper } from '../../type';
import { TemporalType } from '../../type';

@Component({
  selector: 'dp-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input()
  selectedDate: DateWrapper;
  @Input()
  calendar: DateWrapper[][];
  @Input()
  weekdayNames: string[];
  @Input()
  temporal: TemporalType;

  @Output()
  onSelect: EventEmitter<Date>;

  constructor() {
    this.onSelect = new EventEmitter<Date>();
  }

  ngOnInit() {
  }

  pick(wrap: DateWrapper): void {
    console.debug('picking day: ', wrap.value);
    this.onSelect.emit(wrap.value);
  }
}
