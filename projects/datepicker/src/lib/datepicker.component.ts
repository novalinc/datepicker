import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TemporalType } from './type';

@Component({
  selector: 'dz-datepicker',
  template: `
  <div [tabindex]="tabIndex" (blur)="onBlur()"  (focus)="onFocus()" >
    <dp-display
      (onPopup)="togglePopup($event)"
      (onClear)="clearDate($event)"
      [selectedDate]="selectedDate"
      placeholder="placeholder"
      [temporal]="temporal">
    </dp-display>
    
    <dp-popup 
      [opened]="popup"
      [selectedDate]="selectedDate"
      [temporal]="temporal"
      (onSelect)="onChange($event)">
    </dp-popup>
  </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
  }]
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {

  @Input() tabIndex: number;
  @Input() temporal: TemporalType;
  @Input() placeholder: string;
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
  required: boolean;
  use24Hour: boolean;
  */
  popup: boolean;
  selectedDate: Date;

  constructor() {
    this.change = new EventEmitter<Date>();
  }

  ngOnInit() {
    if (!this.tabIndex) {
      this.tabIndex = 0;
    }
    if (!this.temporal) {
      this.temporal = TemporalType.DATE;
    } else {
      console.debug('Temporal explicitly set to %s', this.temporal);
    }

    this._defaultValue = this.selectedDate;
  }

  writeValue(obj: Date | number): void {
    if (obj instanceof Date) {
      this.selectedDate = obj;
    } else if (typeof obj == 'number') {
      console.debug("Passed in epoch unix timestamp '%s'", obj);
      this.selectedDate = new Date(obj);
    } else {
      console.debug('%s is not a valid date', obj)
    }
  }

  registerOnChange(fn: any): void {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._propagateTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("'Disabled' Method not implemented.");
  }

  clearDate(date: Date): void {
    console.debug('Clearing date ', date);
    this.selectedDate = this._defaultValue;
  }

  onBlur(): void {
    this._propagateTouch(this.selectedDate);
    // this.popup = false; // TODO: this should be enabled in prod
  }

  onChange(date: Date): void {
    this.selectedDate = date;
    this._propagateChange(date);
    this.change.emit(date);
    this.popup = false;
  }

  togglePopup(date: Date): void {
    this.popup = !this.popup;
    this.selectedDate = date;

    console.debug('Toggle ', this.popup, date);
    // get default value on first popup
    if (!this._loaded) {
      this._loaded = true;
      this._defaultValue = date;
    }
  }

  onFocus(): void {
    console.debug('focusing: %s', this.selectedDate);
  }

  private _propagateChange = (e: any) => {
    console.debug('PROP_CHANGE: ', e);
  };

  private _propagateTouch = (e: any) => {
    console.debug('PROP_TOUCH: ', e);
  };

  private _defaultValue: Date;
  private _loaded: boolean;
}
