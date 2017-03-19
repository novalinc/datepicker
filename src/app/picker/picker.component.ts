import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import * as moment from 'moment';

import { DateModel } from './types';


const YEAR = 0;
const MONTH = 1;
const DAY = 2;
const HOUR = 3;
const MINUTE = 4;

@Component({
    selector: 'nl-picker',
    templateUrl: 'picker.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PickerComponent),
        multi: true
    }]
})
export class PickerComponent implements ControlValueAccessor, OnInit {
    @Input() format: string; // YYYY-MM-DD HH:mm:ss
    @Input() temporal: string; // date*, timestamp, time
    @Input() locale: string; // use ISO standards here eg. en.ZA
    @Input() required: any;
    @Input() minDate: Date; // based of format
    @Input() maxDate: Date; // based of format
    @Input() future: any;
    @Input() past: any;

    maxThreshold: number;
    minThreshold: number;
    opened: boolean;
    months: string[] = moment.months();
    days: string[] = moment.weekdaysMin();
    weeks: Array<Array<DateModel>>;
    times: Array<DateModel>;

    constructor() {
        this.weeks = [];
        this.times = [];
        this._cursor = moment();
    }

    ngOnInit(): void {
        if ((this.future !== undefined) && (this.past !== undefined)) {
            console.warn("Cannot have both 'future' and 'past' directives");
        }
        switch(this.temporal) {
            case "date": 
                this._prettyDateFormat = "D MMM, YYYY";
                this.maxThreshold = DAY;
                this.minThreshold = YEAR;
                this._focus = DAY;
                break;
            case "timestamp": 
                this._prettyDateFormat = "D MMM, YYYY HH:mm";
                this.maxThreshold = MINUTE;
                this.minThreshold = YEAR;
                this._focus = DAY;
                break;
            case "time": 
                this._prettyDateFormat = "HH:mm";
                this.maxThreshold = MINUTE;
                this.minThreshold = HOUR;
                this._focus = HOUR;
                break;
            default:
                this._prettyDateFormat = "D MMM, YYYY HH:mm";
                this.maxThreshold = MINUTE;
                this.minThreshold = YEAR;
                this._focus = DAY;
                break;
        }

    }

    get selectedDate(): DateModel {
        return this._selectedDate;
    }

    set selectedDate(val: DateModel) {
        this._selectedDate = val;
    }

    writeValue(model: DateModel) : void {
        if (model !== undefined) { 
            this.selectedDate = model;
        }
    }

    registerOnChange(fn: any) : void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) : void {
        this.propagateTouch = fn;
    }

    zoomIn(dateModel: DateModel, event: any): void {

        if (dateModel.disabled) {
            console.warn("Disabled date");
            return;
        }

        if (this._selectedDate !== dateModel) {
            this.propagateChange(this._selectedDate);
        }
        this._selectedDate = dateModel;
        this._cursor = moment(dateModel.getMoment()); //change point of focus to the selected date
        if (this._focus === this.maxThreshold) {
            this.opened = false;
            return;
        }
        this._focus++;
        this.createCalendar();
    }

    zoomOut(event: any): void {
        if (this._focus === this.minThreshold) {
            console.warn("Min threshold reached");
            return;
        }
        this._focus--;
        this.createCalendar();
    }

    prettyDate(): string {
        if (this.selectedDate) {
            return this.selectedDate.getMoment().format(this._prettyDateFormat);
        }
        return "Please select";
    }

    viewTitle(): string {
        switch(this._focus) {
            case YEAR: {
                let start = this._cursor.year() - 5;
                let end = start + 11;
                return start + " - " + end;
            }
            case MONTH: {
                return this._cursor.format("YYYY");
            }
            case DAY: {
                return this._cursor.format("MMM YYYY");
            }
            case HOUR: {
                return this._cursor.format("MMM D, YYYY");
            }
            case MINUTE: {
                return this._cursor.format("MMM D, YYYY @ HH:mm");
            }
            default: {
                return "UNKNOWN";
            }
        }
    }

    get currentView(): string {
        return this.VIEWS[this._focus];
    }

    nextView(): void {
        this.adjustSelectedDate(1);        
        this.createCalendar();
    }

    previousView(): void {
        this.adjustSelectedDate(-1);        
        this.createCalendar();
    }

    toggle(): void {
        this.opened = !this.opened;
        this.propagateTouch(this.selectedDate);
        if (this.opened) {
            this.createCalendar();
        }
    }

    private _selectedDate: DateModel;

    private _cursor: moment.Moment;

    private _prettyDateFormat: string;

    private _focus: number;

    private propagateChange = (e) => { };

    private propagateTouch = (e) => { };

    private readonly VIEWS: Array<string> = ["years", "months", "days", "hours", "minutes"];

    private adjustSelectedDate(by: number): void {
        switch(this._focus) {
            case YEAR:
                this._cursor.add(by * 12, "year");
                break;
            case MONTH:
                this._cursor.add(by, "year");
                break;
            case DAY:
                this._cursor.add(by, "month");
                break;
            case HOUR:
                this._cursor.add(by, "day");
                break;
            case MINUTE:
                this._cursor.add(by, "hour");
                break;
            default:                 
        }
    }

    private createCalendar(): void {
        const now = moment();

        switch (this._focus) {
            case YEAR: {
                this.times = [];
                let t = moment(this._cursor).add(-5, "year");
                for (let i=0; i < 12; i++) {
                    let active = now.isSame(t, "year");
                    let selected = !this._selectedDate? false : t.isSame(this._selectedDate.getMoment(), "year");
                    let disabled = (this.future !== undefined)? now.diff(t, "year") > 0 : (this.past !== undefined) ? now.diff(t) < 1 : false;
                    let date = new DateModel(moment(t), active, selected, disabled);

                    t.add(1, "year");
                    this.times.push(date);
                }
            }
            break;
            case MONTH: {
                this.times = [];
                let t = moment(this._cursor).month(0);
                for (let i=0; i < 12; i++) {
                    let active = now.isSame(t, "month");
                    let selected = !this._selectedDate? false : t.isSame(this._selectedDate.getMoment(), "month"); 
                    let disabled = (this.future !== undefined)? now.diff(t, "month") > 0 : (this.past !== undefined) ? now.diff(t) < 1 : false;
                    let date = new DateModel(moment(t), active, selected,  disabled);

                    t.add(1, "month");
                    this.times.push(date);
                }
            }
            break;
            case DAY: {
                let firstOfMonth = moment(this._cursor).date(1);
                let t = moment(firstOfMonth).day(0);
                // Leave extra room of previous month if month starts on Sunday
                if (firstOfMonth.day() === 0) {
                    t.add(-7, 'day');
                }
                this.weeks = [[], [], [], [], [], []];
                for (let week of this.weeks) {
                    for (let i=0; i < 7; i++) {
                        let active = now.isSame(t, "day");
                        let selected = !this._selectedDate? false : t.isSame(this._selectedDate.getMoment(), "day"); 
                        let disabled = (this.future !== undefined)? now.diff(t, "day") > 0 : ((this.past !== undefined) ? now.diff(t) < 1 : false);
                        let date = new DateModel(moment(t), active, selected, disabled);

                        week.push(date);
                        t.add(1, 'day');
                    }
                }
            }
            break;
            case HOUR: {//Hour
                this.times = [];
                let t = moment(this._cursor).hour(0);
                for (let i=0; i < 24; i++) {
                    let active = now.isSame(t, "hour");
                    let selected = !this._selectedDate? false : t.isSame(this._selectedDate.getMoment(), "hour"); 
                    let disabled = (this.future !== undefined)? now.diff(t, "hour") > 0 : (this.past !== undefined) ? now.diff(t) < 1 : false;
                    let date = new DateModel(moment(t), active, selected, disabled);
                    t.add(1, "hour");
                    this.times.push(date);
                }
            }
            break;
            case MINUTE: {//Minute
                this.times = [];
                let t = moment(this._cursor).minute(0);
                for (let i=0; i < 12; i++) {
                    let active = now.isSame(t, "minute");
                    let selected = !this._selectedDate? false : t.isSame(this._selectedDate.getMoment(), "minute"); 
                    let disabled = (this.future !== undefined)? now.diff(t, "minute") > 0 : (this.past !== undefined) ? now.diff(t) < 1 : false;
                    let date = new DateModel(moment(t), active, selected, disabled);
                    t.add(5, "minute");
                    this.times.push(date);
                }
            }
            break;
        }
    }
}