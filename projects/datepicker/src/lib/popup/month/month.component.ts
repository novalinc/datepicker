import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DateWrapper } from '../../type';

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
}
