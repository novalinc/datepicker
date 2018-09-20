import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TemporalType } from './type';
import { IconDefinition, faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

import { DatepickerService } from './service/datepicker.service';

@Component({
  selector: 'dz-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
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

  iconCal: IconDefinition;
  undoIcon: IconDefinition = faUndo;

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
  value: Date;
  dirty: boolean;

  constructor(private _service: DatepickerService) {
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

    if (this.temporal === TemporalType.TIME) {
      this.iconCal = faClock;
    } else {
      this.iconCal = faCalendarAlt;
    }

    let hack = 0;
    this._service.pick$.subscribe(
      (date) => {
        // I'm only interested in the second value
        if (hack == 2) {
          console.debug('Setting reset value %s', date, hack);
          this._defaultValue = date;
        }
        hack++;
      }
    );
  }

  writeValue(obj: Date | number): void {
    console.debug('Setting value: %s', obj);
    if (obj instanceof Date) {
      this.value = obj;
    } else if (obj && !isNaN(obj)) {
      console.debug("Passed in epoch unix timestamp '%s'", obj);
      this.value = new Date(obj);
    }

    // Hack, this is to catpture this value in the OnInit() method
    // Invoked twice for some reason
    this._service.pickDate(this.value);
  }

  registerOnChange(fn: any): void {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._propagateTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("'Disabled' Method not implemented.");
  }

  clearDate(): void {
    console.debug('Clearing date %s', this.value);
    this.value = this._defaultValue;
    this._service.pickDate(this._defaultValue);
  }

  onBlur(): void {
    this._propagateTouch(this.value);
    // this.popup = false; // TODO: this should be enabled in prod
  }

  onChange(date: Date): void {
    this.popup = false;
    this.value = date;
    this._propagateChange(date);
    this.dirty = true;
    // this.change.emit(date);
  }

  togglePopup(): void {
    console.debug('Toggle %s', this.popup);
    this.popup = !this.popup;
    if (this.popup) {
      this._service.pickDate(this.value ? this.value : new Date());
    }
  }

  onFocus(): void {
    console.debug('focusing: %s', this.value);
  }

  private _propagateChange = (e: any) => {
    console.debug('PROP_CHANGE: ', e);
  };

  private _propagateTouch = (e: any) => {
    console.debug('PROP_TOUCH: ', e);
  };

  private _defaultValue: Date;
}
