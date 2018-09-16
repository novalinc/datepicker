import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TemporalType } from './type';
import { IconDefinition, faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
  deleteIcon: IconDefinition = faTrashAlt;

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

    this._service.value$.subscribe(
      (date) => {
        this.selectedDate = date;

        if (!this._defaultValue && this.selectedDate) {
          console.debug('Setting reset value');
          this._defaultValue = this.selectedDate;
        }
      }
    );
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

    this._service.setValue(this.selectedDate);
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

  clearDate(): void {
    console.debug('Clearing date %s', this.selectedDate);
    this.selectedDate = this._defaultValue;
    this._service.setValue(this._defaultValue);
  }

  onBlur(): void {
    this._propagateTouch(this.selectedDate);
    // this.popup = false; // TODO: this should be enabled in prod
  }

  onChange(date: Date): void {
    this.selectedDate = date;
    this._propagateChange(date);
    this.change.emit(date);
    this._service.setValue(date);
    this.popup = false;
  }

  togglePopup(): void {
    this.popup = !this.popup;

    console.debug('Toggle %s', this.popup);
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
  // private _firstLoad: boolean;
}
