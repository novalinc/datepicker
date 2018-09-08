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
  yearView: boolean;

  constructor() {
    this.onSelect = new EventEmitter<Date>();
  }

  ngOnInit() {
  }

  onPick(date: Date): void {
    if (this.selectedDate !== date) {
      console.debug('pre-change event: %s', this.selectedDate);
      this.selectedDate = date;
      this.onSelect.emit(date);
    } else {
      console.debug('no pre-change event');
    }
  }
}
