import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TemporalType } from '../type';
import { DatepickerService } from '../service/datepicker.service';

@Component({
  selector: 'dp-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() temporal: TemporalType;

  @Output()
  onSelect: EventEmitter<Date>;

  pickedDate: Date;
  viewMode: string;

  constructor(private _service: DatepickerService) {
    this.onSelect = new EventEmitter<Date>();
    this.viewMode = 'day';
  }

  ngOnInit() {
    this._service.pick$.subscribe(date => {
      this.pickedDate = date;
    });

    if (this.temporal == TemporalType.DATE
      || this.temporal == TemporalType.TIMESTAMP) {
      this.viewMode = 'day';
    } else {
      this.viewMode = 'time'
    }
  }

  onPickDay(dateEvent: Date): void {

    if (this.pickedDate !== dateEvent) {
      this.pickedDate = dateEvent;
      console.debug('pre-change event: ', this.pickedDate);
      this.onSelect.emit(dateEvent);
    } else {
      console.debug('no pre-change event');
    }
  }

  onPickMonth(dateEvent: Date): void {
    this.pickedDate = dateEvent;
    this.viewMode = 'day';
  }
}
