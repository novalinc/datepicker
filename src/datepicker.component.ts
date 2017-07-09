import { Component, Input, Output, OnInit, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import * as moment from 'moment';

import { DateModel, TimeUnit, DatepickerOptions, TemporalType } from './datepicker.types';
import { DatepickerService } from './datepicker.service';



@Component({
    selector: 'nl-datepicker',
    template: `
<!-- tabindex="0" SHOULD NOT be hard coded like this -->
<div class="ui-datepicker" tabindex="0" (focus)="onFocus()" (blur)="onBlur()">
    <div class="datepicker-group" (click)="onClick()">
        <div class="datepicker-icon">
            <div [ngClass]="{ 'glyphicon': true, 'glyphicon-calendar': !isTime, 'glyphicon-time': isTime, 'center-block': true}"></div>
        </div>
        <div class="datepicker-control">
            <p class="datepicker-superval">{{prettyDate.top}}</p>
            <p class="datepicker-subval">{{prettyDate.main}} <span class="datepicker-ampm">{{prettyDate.marker}}</span></p>
        </div>
        <div *ngIf="!selectedDate" class="datepicker-control text-muted text-center" [innerText]="placeholder"></div>
    </div>
    <div *ngIf="opened" class="nldp-widget dropdown-menu" style="top: auto; left: auto; ">
        <div *ngIf="currentView === 'day'" class="datepicker-day">
            <table class="table-condensed">
                <thead>
                    <tr>
                        <th class="prev" (click)="previousView()"><span class="glyphicon glyphicon-chevron-left"></span></th>
                        <th class="datepicker-switch" (click)="zoomOut($event)" colspan="5">{{ viewTitle }}</th>
                        <th class="next" (click)="nextView()"><span class="glyphicon glyphicon-chevron-right"></span></th>
                    </tr>
                    <tr>
                        <th *ngFor="let day of days" class="dow">{{ day }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let week of times">
                        <td *ngFor="let day of week"
                            class="day"
                            (click)="zoomIn(day)" 
                            [ngClass]="{active: day.selected, today: day.active, blurred: false, disabled: day.disabled}"
                            [innerText]="getTimeUnitValue(day)">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div *ngIf="currentView != 'day'" class="datepicker-{{currentView}}">
            <table class="table-condensed">
                <thead>
                    <tr>
                        <th class="prev" (click)="previousView()"><span class="glyphicon glyphicon-chevron-left"></span></th>
                        <th class="datepicker-switch" (click)="zoomOut($event)" colspan="5">{{ viewTitle }}</th>
                        <th class="next" (click)="nextView()"><span class="glyphicon glyphicon-chevron-right"></span></th>
                    </tr>
                    <tr>
                        <th colspan="7">
                            Select {{currentView}}
                        </th>
                    </tr>                        
                </thead>
                <tbody>
                    <tr>
                        <td colspan="7">
                            <span 
                                *ngFor="let time of times"
                                [ngClass]="{active: time.selected, today: time.active, disabled: time.disabled}"
                                (click)="zoomIn(time)"
                                [innerText]="getTimeUnitValue(time)">
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
`
    ,
    styles: [ `
.nldp-widget {
list-style: none;
}

.nldp-widget.dropdown-menu {
display: block;
margin: 2px 0;
padding: 4px;
width: 19em;
}
@media (min-width: 768px) {
.nldp-widget.dropdown-menu.timepicker-sbs {
    width: 38em;
}
}
@media (min-width: 992px) {
.nldp-widget.dropdown-menu.timepicker-sbs {
    width: 38em;
}
}
@media (min-width: 1200px) {
.nldp-widget.dropdown-menu.timepicker-sbs {
    width: 38em;
}
}
.nldp-widget.dropdown-menu:before,
.nldp-widget.dropdown-menu:after {
content: '';
display: inline-block;
position: absolute;
}
.nldp-widget.dropdown-menu.bottom:before {
border-left: 7px solid transparent;
border-right: 7px solid transparent;
border-bottom: 7px solid #ccc;
border-bottom-color: rgba(0, 0, 0, 0.2);
top: -7px;
left: 7px;
}
.nldp-widget.dropdown-menu.bottom:after {
border-left: 6px solid transparent;
border-right: 6px solid transparent;
border-bottom: 6px solid white;
top: -6px;
left: 8px;
}
.nldp-widget.dropdown-menu.top:before {
border-left: 7px solid transparent;
border-right: 7px solid transparent;
border-top: 7px solid #ccc;
border-top-color: rgba(0, 0, 0, 0.2);
bottom: -7px;
left: 6px;
}
.nldp-widget.dropdown-menu.top:after {
border-left: 6px solid transparent;
border-right: 6px solid transparent;
border-top: 6px solid white;
bottom: -6px;
left: 7px;
}
.nldp-widget.dropdown-menu.pull-right:before {
left: auto;
right: 6px;
}
.nldp-widget.dropdown-menu.pull-right:after {
left: auto;
right: 7px;
}
.nldp-widget .list-unstyled {
margin: 0;
}
.nldp-widget a[data-action] {
padding: 6px 0;
}
.nldp-widget a[data-action]:active {
box-shadow: none;
}
.nldp-widget .timepicker-hour,
.nldp-widget .timepicker-minute,
.nldp-widget .timepicker-second {
width: 54px;
font-weight: bold;
font-size: 1.2em;
margin: 0;
}
.nldp-widget button[data-action] {
padding: 6px;
}
.nldp-widget .btn[data-action="incrementHours"]::after {
position: absolute;
width: 1px;
height: 1px;
margin: -1px;
padding: 0;
overflow: hidden;
clip: rect(0, 0, 0, 0);
border: 0;
content: "Increment Hours";
}
.nldp-widget .btn[data-action="incrementMinutes"]::after {
position: absolute;
width: 1px;
height: 1px;
margin: -1px;
padding: 0;
overflow: hidden;
clip: rect(0, 0, 0, 0);
border: 0;
content: "Increment Minutes";
}
.nldp-widget .btn[data-action="decrementHours"]::after {
position: absolute;
width: 1px;
height: 1px;
margin: -1px;
padding: 0;
overflow: hidden;
clip: rect(0, 0, 0, 0);
border: 0;
content: "Decrement Hours";
}
.nldp-widget .btn[data-action="decrementMinutes"]::after {
position: absolute;
width: 1px;
height: 1px;
margin: -1px;
padding: 0;
overflow: hidden;
clip: rect(0, 0, 0, 0);
border: 0;
content: "Decrement Minutes";
}
.nldp-widget .btn[data-action="showHours"]::after {
position: absolute;
width: 1px;
height: 1px;
margin: -1px;
padding: 0;
overflow: hidden;
clip: rect(0, 0, 0, 0);
border: 0;
content: "Show Hours";
}
.nldp-widget .btn[data-action="showMinutes"]::after {
position: absolute;
width: 1px;
height: 1px;
margin: -1px;
padding: 0;
overflow: hidden;
clip: rect(0, 0, 0, 0);
border: 0;
content: "Show Minutes";
}
.nldp-widget .btn[data-action="togglePeriod"]::after {
position: absolute;
width: 1px;
height: 1px;
margin: -1px;
padding: 0;
overflow: hidden;
clip: rect(0, 0, 0, 0);
border: 0;
content: "Toggle AM/PM";
}
.nldp-widget .btn[data-action="clear"]::after {
position: absolute;
width: 1px;
height: 1px;
margin: -1px;
padding: 0;
overflow: hidden;
clip: rect(0, 0, 0, 0);
border: 0;
content: "Clear the picker";
}
.nldp-widget .btn[data-action="today"]::after {
position: absolute;
width: 1px;
height: 1px;
margin: -1px;
padding: 0;
overflow: hidden;
clip: rect(0, 0, 0, 0);
border: 0;
content: "Set the date to today";
}
.nldp-widget .datepicker-switch {
text-align: center;
}
.nldp-widget .datepicker-switch::after {
position: absolute;
width: 1px;
height: 1px;
margin: -1px;
padding: 0;
overflow: hidden;
clip: rect(0, 0, 0, 0);
border: 0;
content: "Toggle Date and Time Screens";
}
.nldp-widget .datepicker-switch td {
padding: 0;
margin: 0;
height: auto;
width: auto;
line-height: inherit;
}
.nldp-widget .datepicker-switch td span {
line-height: 2.5;
height: 2.5em;
width: 100%;
}
.nldp-widget table {
width: 100%;
margin: 0;
}
.nldp-widget table td,
.nldp-widget table th {
text-align: center;
border-radius: 4px;
}
.nldp-widget table th {
height: 20px;
line-height: 20px;
width: 20px;
}
.nldp-widget table th.datepicker-switch {
width: 145px;
}
.nldp-widget table th.disabled,
.nldp-widget table th.disabled:hover {
background: none;
color: #777777;
cursor: not-allowed;
}
.nldp-widget table th.prev::after {
position: absolute;
width: 1px;
height: 1px;
margin: -1px;
padding: 0;
overflow: hidden;
clip: rect(0, 0, 0, 0);
border: 0;
content: "Previous Month";
}
.nldp-widget table th.next::after {
position: absolute;
width: 1px;
height: 1px;
margin: -1px;
padding: 0;
overflow: hidden;
clip: rect(0, 0, 0, 0);
border: 0;
content: "Next Month";
}
.nldp-widget table thead tr:first-child th {
cursor: pointer;
}
.nldp-widget table thead tr:first-child th:hover {
background: #eeeeee;
}
.nldp-widget table td {
height: 54px;
line-height: 54px;
width: 54px;
}
.nldp-widget table td.cw {
font-size: .8em;
height: 20px;
line-height: 20px;
color: #777777;
}
.nldp-widget table td.day {
height: 20px;
line-height: 20px;
width: 20px;
}
.nldp-widget table td.day:hover,
.nldp-widget table td.hour:hover,
.nldp-widget table td.minute:hover,
.nldp-widget table td.second:hover {
background: #eeeeee;
cursor: pointer;
}
.nldp-widget table td.blurred {
color: #777777;
}
.nldp-widget table .today {
position: relative;
}
.nldp-widget table .today:before {
content: '';
display: inline-block;
border: solid transparent;
border-width: 0 0 10px 10px;
border-bottom-color: #337ab7;
border-top-color: rgba(0, 0, 0, 0.2);
position: absolute;
bottom: 4px;
right: 4px;
}
.nldp-widget table td.active,
.nldp-widget table td.active:hover {
background-color: #337ab7;
color: #fff;
text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
}
.nldp-widget table td.active.today:before {
border-bottom-color: #fff;
}
.nldp-widget table td.disabled,
.nldp-widget table td.disabled:hover {
background: none;
color: #777777;
cursor: not-allowed;
}
.nldp-widget table td span {
display: inline-block;
width: 54px;
height: 54px;
line-height: 54px;
margin: 2px 1.5px;
cursor: pointer;
border-radius: 4px;
}
.nldp-widget table td span:hover {
background: #eeeeee;
}
.nldp-widget table td span.active {
background-color: #337ab7;
color: #fff;
text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
}
.nldp-widget table td span.old {
color: #777777;
}
.nldp-widget table td span.disabled,
.nldp-widget table td span.disabled:hover {
background: none;
color: #777777;
cursor: not-allowed;
}
.nldp-widget.usetwentyfour td.hour {
height: 27px;
line-height: 27px;
}
.nldp-widget.wider {
width: 21em;
}
.nldp-widget .datepicker-decades .decade {
line-height: 1.8em !important;
}

.ui-datepicker {

}

.datepicker-group {
    cursor: pointer;
    display: table;
    width: 100%;
    min-height: 50px;
    border: 1px solid #ccc;
    border-radius: 4px;    
}

.datepicker-control {
    padding-top: 5px;
}

.datepicker-control, .datepicker-icon {
    display: table-cell;
}

.datepicker-icon {
    vertical-align: middle;
    width: 50px;
    font-size: 20pt;
    padding-left: 13px;
}

.datepicker-placeholder {
    color: #ababab;
}

.datepicker-superval, .datepicker-subval {
    margin: 0px;
    padding: 0px;
}

.datepicker-superval {
    font-size: 11px;
    font-weight: bold;
}

.datepicker-subval {
    font-size: 20px;
}

.datepicker-ampm {
    font-size: 60%;
}

.sr-only {
position: absolute;
width: 1px;
height: 1px;
margin: -1px;
padding: 0;
overflow: hidden;
clip: rect(0, 0, 0, 0);
border: 0;
}`
     ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatepickerComponent),
        multi: true
    }]
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {
    @Input() required: any;
    @Input() options: DatepickerOptions;
    @Output() change: EventEmitter<Date> = new EventEmitter<Date>();


    maxThreshold: number;
    minThreshold: number;
    opened: boolean;
    months: string[] = moment.months();
    days: string[] = moment.weekdaysMin();
    times: Array<DateModel | Array<DateModel>>;

    constructor(private _service: DatepickerService) {
        this.times = [];
        this._cursor = moment();
    }

    ngOnInit(): void {

        if (!this.options) {
            // Use defaults
            console.debug("Using default options because none were specified");
            this.options = new DatepickerOptions();
        }

        if ((this.options.future !== undefined) && (this.options.past !== undefined)) {
            console.warn("Cannot have both 'future' and 'past' directives");
        }
        switch(this.options.temporal) {
            case TemporalType.DATE: 
                this.maxThreshold = TimeUnit.DAY;
                this.minThreshold = TimeUnit.YEAR;
                this._focus = TimeUnit.DAY;
                break;
            case TemporalType.TIMESTAMP: 
                this.maxThreshold = TimeUnit.MINUTE;
                this.minThreshold = TimeUnit.YEAR;
                this._focus = TimeUnit.DAY;
                break;
            case TemporalType.TIME: 
                this.maxThreshold = TimeUnit.MINUTE;
                this.minThreshold = TimeUnit.HOUR;
                this._focus = TimeUnit.HOUR;
                break;
            default:
                this.maxThreshold = TimeUnit.MINUTE;
                this.minThreshold = TimeUnit.YEAR;
                this._focus = TimeUnit.DAY;
                break;
        }

    }

    get selectedDate(): Date {
        return this._selectedDate;
    }

    set selectedDate(val: Date) {
        this._selectedDate = val;
    }

    writeValue(model: Date) : void {
        if (model) { 
            this._cursor = moment(model);
            // Convert to Date object
            if (model instanceof Date) { // Date object
                this.selectedDate = model;
                this._defaultDate = model;
            } else { // Epoch Unix Time Stamp
                console.log("Passed in epoch unix timestamp '"+ model + "', I'm converting to Date object");
                this.selectedDate = new Date(model);
                this._defaultDate = this.selectedDate;
            }
        } else {
            this._cursor = moment();
        }
    }

    registerOnChange(fn: any) : void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) : void {
        this.propagateTouch = fn;
    }

    zoomIn(dateModel: DateModel): void {

        if (!dateModel) {
            console.error("Could not ZoomIn there is a problem");
        }

        let date = dateModel.toDate();
        if (dateModel.disabled) {
            console.warn("Date '" + date + "' is disabled");
            return;
        }
        
        console.log("SELECTED: {}", this._selectedDate);
        if (!this._selectedDate || this._selectedDate.getTime() !== date.getTime()) {
            this._selectedDate = date;
            this._cursor = moment(date); //change point of focus to the selected date
            this.propagateChange(this._selectedDate);
            this.change.emit(this._selectedDate);
        }

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

    get prettyDate(): any {
        if (this.selectedDate) {
            let m = moment(this.selectedDate);

            let 
            year = m.format("YYYY"), 
            month = m.format("MMM"), 
            day = m.format("D"), 
            hour = this.options.use24Hour ? m.format("HH") : m.format("h"), 
            minute =  m.format("mm"),
            marker = this.options.use24Hour ? '' : m.format("a");

            const timeString = 'Time'; // TODO: some how this should be locale aware
            switch(this.options.temporal) {
                case TemporalType.DATE: 
                    return { top: `${m.format("dddd")}, ${year}`, main: `${day} ${month}`};
                case TemporalType.TIMESTAMP: 
                    return { top: `${m.format("ddd")} ${day} ${month}, ${year}`, main: `${hour}:${minute}`, marker: marker};
                case TemporalType.TIME:
                    return { top: timeString, main: `${hour}:${minute}`, marker: marker};
                default:
                console.warn("Invalid temporal: ", this.options.temporal);
                    return { top: `${m.format("ddd")} ${day} ${month}, ${year}`, main: `${hour}:${minute}`, marker: marker};
            } 
        }

        return {};
    }

    get placeholder(): string {
        return this.options.placeholder;
    }

   get viewTitle(): string {
        switch(this._focus) {
            case TimeUnit.YEAR: {
                let start = this._cursor.year() - 5;
                let end = start + 11;
                return start + " - " + end;
            }
            case TimeUnit.MONTH: {
                return this._cursor.format("YYYY");
            }
            case TimeUnit.DAY: {
                return this._cursor.format("MMM YYYY");
            }
            case TimeUnit.HOUR: {
                return this._cursor.format("MMM D, YYYY");
            }
            case TimeUnit.MINUTE: {
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

    get isTime(): boolean {
        return this.options.temporal === TemporalType.TIME;
    }

    getTimeUnitValue(dateModel: DateModel) : string {

        if (!dateModel) {
            console.error("Invalid object passed");
            return "Err";
        }

        let m = dateModel.moment;
        switch(this._focus) {
            case TimeUnit.YEAR:
                return m.format("YYYY");
            case TimeUnit.MONTH:
                return m.format("MMM");
            case TimeUnit.DAY:
                return m.date() + "";
            case TimeUnit.HOUR:
                return m.format("HH");
            case TimeUnit.MINUTE:
                return m.format("mm");

        }
    }

    nextView(): void {
        this.adjustSelectedDate(1);
        this.createCalendar();
    }

    previousView(): void {
        this.adjustSelectedDate(-1);        
        this.createCalendar();
    }

    onClear() {
        this._selectedDate = this._defaultDate;
    }

    onClick(): void {
        this.opened = !this.opened;
    }

    onFocus(): void {
        this.createCalendar();
    }

    onBlur(): void {
        this.propagateTouch(this.selectedDate);
        this.opened = false;
    }

    private _selectedDate: Date;

    private _defaultDate: Date;

    private _cursor: moment.Moment;

    private _focus: TimeUnit;

    private propagateChange = (e: any) => { };

    private propagateTouch = (e: any) => { };

    private readonly VIEWS: Array<string> = ["year", "month", "day", "hour", "minute"];

    private adjustSelectedDate(by: number): void {
        this._service.adjustCursor(this._focus, this._cursor, by);
    }

    private createCalendar(): void {
        this.times = this._service.createCalendar(this._focus, this._cursor, this._selectedDate, this.options);
    }
}