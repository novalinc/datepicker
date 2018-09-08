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

  constructor(private _service: DatepickerService) {
    this.onSelect = new EventEmitter<Date>();
  }

  ngOnInit() {

  }

  pick(wrap: DateWrapper): void {
    console.debug('picking month: ', wrap.value);
    this.onSelect.emit(wrap.value);
  }
}
