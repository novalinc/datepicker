import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateWrapper, TemporalType } from '../type';
import { DatepickerService } from '../service/datepicker.service';

@Component({
  selector: 'dp-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() opened: boolean;
  @Input() selectedDate: Date;
  @Input() temporal: TemporalType;

  @Output()
  onSelect: EventEmitter<Date>;

  constructor(private _service: DatepickerService) {
    this.onSelect = new EventEmitter<Date>();
  }

  ngOnInit() {
    this._service.value$.subscribe(date => {
      this.selectedDate = date;
      this._service.pickDate(date); // initialize pick date with current value
    });

  }

  toggleYearView(): boolean {
    return this._yearView = !this._yearView;
  }

  get yearView(): boolean {
    return this._yearView;
  }

  onPickDay(dateEvent: Date): void {

    if (this.selectedDate !== dateEvent) {
      this.selectedDate = dateEvent;
      console.debug('pre-change event: ', this.selectedDate);
      this.onSelect.emit(dateEvent);
    } else {
      console.debug('no pre-change event');
    }
  }

  onPickMonth(dateEvent: Date): void {
    this._yearView = false;
    this.selectedDate = dateEvent;
  }

  private _yearView: boolean;
}
