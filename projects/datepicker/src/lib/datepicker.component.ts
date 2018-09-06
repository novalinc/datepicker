import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TimeUnit, TemporalType } from './type';
import moment from 'moment';

@Component({
  selector: 'nl-datepicker',
  template: `
  <div [tabindex]="tabIndex" (blur)="onBlur()"  (focus)="onFocus()" >
    <dp-display 
      (click)="popup = !popup"
      [selectedDate]="selectedDate"
      [temporal]="temporal">
    </dp-display>
    
    <dp-popup 
      [opened]="popup"
      [selectedDate]="selectedDate"
      (onSelectDate)="onChange()"
      [timeUnit]="timeUnit">
    </dp-popup>
  </div>
  `,
  styles: [],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
  }]
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {

  @Input() tabIndex: number;
  @Input() selectedDate: Date;
  @Input() cursor: Date;
  @Input() timeUnit: TimeUnit;
  @Input() temporal: TemporalType;
  @Output() change: EventEmitter<Date>;

  // Options
  /*
  future: boolean;
  disabled: boolean;
  disabledDates: Array<Date>;
  publicHolidays: Array<Event>;
  locale: string;
  minDate: Date;
  maxDate: Date;
  past: boolean;
  placeholder: string;
  required: boolean;
  use24Hour: boolean;
  */
  popup: boolean;

  constructor() {
    this.temporal = TemporalType.DATE;
    this.timeUnit = TimeUnit.MONTH;
    this.change = new EventEmitter<Date>();
  }

  ngOnInit() {
    if (!this.tabIndex) {
      this.tabIndex = 0;
    }
  }

  writeValue(obj: Date | number): void {
    if (obj) {

      if (obj instanceof Date) {
        this.selectedDate = obj;
      } else {
        console.debug("Passed in epoch unix timestamp '%s', I'm converting to Date object", obj);
        this.selectedDate = new Date(obj);
      }
    } else {

    }
  }

  registerOnChange(fn: any): void {
    console.info('ONCHANGEONCHANGEONCHANGE');
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._propagateTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("'Disabled' Method not implemented.");
  }

  onClick(): void {
    this.popup = !this.popup;
  }

  onBlur(): void {
    this._propagateTouch(this.selectedDate);
    // this.popup = false; // TODO: this should be enabled in prod
  }

  onChange(): void {
    this._propagateChange(this.selectedDate);
    this.change.emit(this.selectedDate);
  }

  onFocus(): void {
    console.debug('focusing: %s', this.selectedDate);
  }

  private _propagateChange = (e: any) => {
    console.info('PROP_CHANGE: ', e);
  };

  private _propagateTouch = (e: any) => { };

}
