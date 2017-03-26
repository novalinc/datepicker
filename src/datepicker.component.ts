import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import * as moment from 'moment';

import { DateModel } from './datepicker.types';


const YEAR = 0;
const MONTH = 1;
const DAY = 2;
const HOUR = 3;
const MINUTE = 4;

@Component({
    selector: 'nl-datepicker',
    template: `
<!-- tabindex="0" SHOULD NOT be hard coded like this -->
<div class="ui-datepicker" tabindex="0" (focus)="onFocus()" (blur)="onBlur()" >
    <div class="input-group datepicker-control" >{{prettyDate()}} <span class="glyphicon glyphicon-calendar"></span></div>
        <div *ngIf="opened" class="nldp-widget dropdown-menu" style="display: block; bottom: auto;">
            <div *ngIf="currentView === 'minutes'" class="datepicker-minutes">
                <table class="table-condensed">
                    <thead>
                        <tr>
                            <th class="prev" (click)="previousView()"><span class="glyphicon glyphicon-chevron-left" title="Previous Minute"></span></th>
                            <th class="datepicker-switch" (click)="zoomOut($event)" colspan="5" title="Select Minute">{{ viewTitle() }}</th>
                            <th class="next" (click)="nextView()"><span class="glyphicon glyphicon-chevron-right" title="Next Minute"></span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="7">
                                <span class="hour"
                                    *ngFor="let time of times"
                                    [ngClass]="{active: time.selected, today: time.active, disabled: time.disabled}"
                                    (click)="zoomIn(time, $event)">
                                    {{ time.minuteOfHour() }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div *ngIf="currentView === 'hours'" class="datepicker-hours">
                <table class="table-condensed">
                    <thead>
                        <tr>
                            <th class="prev" (click)="previousView()"><span class="glyphicon glyphicon-chevron-left" title="Previous Hour"></span></th>
                            <th class="datepicker-switch" (click)="zoomOut($event)" colspan="5" title="Select Hour">{{ viewTitle() }}</th>
                            <th class="next" (click)="nextView()"><span class="glyphicon glyphicon-chevron-right" title="Next Hour"></span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="7">
                                <span class="hour"
                                    *ngFor="let time of times"
                                    [ngClass]="{active: time.selected, today: time.active, disabled: time.disabled}"
                                    (click)="zoomIn(time, $event)">
                                    {{ time.hourOfDay() }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div *ngIf="currentView === 'days'" class="datepicker-days">
                <table class="table-condensed">
                    <thead>
                        <tr>
                            <th class="prev" (click)="previousView()"><span class="glyphicon glyphicon-chevron-left" title="Previous Month"></span></th>
                            <th class="datepicker-switch" (click)="zoomOut($event)" colspan="5" title="Select Month">{{ viewTitle() }}</th>
                            <th class="next" (click)="nextView()"><span class="glyphicon glyphicon-chevron-right" title="Next Month"></span></th>
                        </tr>
                        <tr>
                            <th *ngFor="let day of days" class="dow">{{ day }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let week of weeks">
                            <td *ngFor="let date of week"
                                (click)="zoomIn(date, $event)" class="day"
                                [ngClass]="{active: date.selected, today: date.active, blurred: false, disabled: date.disabled}">{{ date.dayOfMonth() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div *ngIf="currentView === 'months'" class="datepicker-months">
                <table class="table-condensed">
                    <thead>
                        <tr>
                            <th class="prev" (click)="previousView()"><span class="glyphicon glyphicon-chevron-left" title="Previous Year"></span></th>
                            <th class="datepicker-switch" (click)="zoomOut($event)" colspan="5" title="Select Year">{{ viewTitle() }}</th>
                            <th class="next" (click)="nextView()"><span class="glyphicon glyphicon-chevron-right" title="Next Year"></span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="7">
                                <span class="month"
                                    *ngFor="let time of times"
                                    [ngClass]="{active: time.selected, today: time.active, disabled: time.disabled}"
                                    (click)="zoomIn(time, $event)">
                                    {{ time.monthOfYear() }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div *ngIf="currentView === 'years'" class="datepicker-years">
                <table class="table-condensed">
                    <thead>
                        <tr>
                            <th class="prev" (click)="previousView()"><span class="glyphicon glyphicon-chevron-left" title="Previous Decade"></span></th>
                            <th class="datepicker-switch" (click)="zoomOut($event)" colspan="5" title="Select Decade">{{ viewTitle() }}</th>
                            <th class="next" (click)="nextView()"><span class="glyphicon glyphicon-chevron-right" title="Next Decade"></span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="7">
                                <span class="year"
                                    *ngFor="let time of times"
                                    [ngClass]="{active: time.selected, today: time.active, disabled: time.disabled}"
                                    (click)="zoomIn(time, $event)">
                                    {{ time.year() }}
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
.input-group.date .input-group-addon {
cursor: pointer;
}
.datepicker-control {
    cursor: pointer;
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

    onFocus(): void {
        this.propagateTouch(this.selectedDate);
        this.createCalendar();
        this.opened = true;
    }

    onBlur(): void {
        this.opened = false;
    }

    private _selectedDate: DateModel;

    private _cursor: moment.Moment;

    private _prettyDateFormat: string;

    private _focus: number;

    private propagateChange = (e: any) => { };

    private propagateTouch = (e: any) => { };

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