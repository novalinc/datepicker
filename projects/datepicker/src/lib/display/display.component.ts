import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TemporalType } from '../type';
import { IconDefinition, faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dp-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  @Input() selectedDate: Date;
  @Input() temporal: TemporalType;
  @Input() placeholder: string;
  @Output() onPopup: EventEmitter<Date>;
  @Output() onClear: EventEmitter<Date>;

  iconCal: IconDefinition;
  deleteIcon: IconDefinition = faTrashAlt;

  constructor() {
    this.onPopup = new EventEmitter<Date>();
    this.onClear = new EventEmitter<Date>();
  }

  ngOnInit() {

    if (this.temporal === TemporalType.TIME) {
      this.iconCal = faClock;
    } else {
      this.iconCal = faCalendarAlt;
    }
  }

  openToggle(): void {
    this.onPopup.emit(this.selectedDate);
  }

  clearDate(): void {
    this.onClear.emit(this.selectedDate);
  }
}
