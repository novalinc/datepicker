import { Injectable } from '@angular/core';

import * as moment from "moment";

import { DateModel, TimeUnit, DatepickerOptions } from './datepicker.types';


@Injectable()
export class DatepickerService {

    adjustCursor(focus: number, cursor: moment.Moment, by: number): void {
        switch(focus) {
            case TimeUnit.YEAR:
                cursor.add(by * 12, "year");
                break;
            case TimeUnit.MONTH:
                cursor.add(by, "year");
                break;
            case TimeUnit.DAY:
                cursor.add(by, "month");
                break;
            case TimeUnit.HOUR:
                cursor.add(by, "day");
                break;
            case TimeUnit.MINUTE:
                cursor.add(by, "hour");
                break;
            default:                 
        }
    }


    createCalendar(focus: number, cursor: moment.Moment, selectedDate: DateModel, options: DatepickerOptions): Array<DateModel | Array<DateModel>> {
        const now = moment();
        
        let times: Array<DateModel | Array<DateModel>> = [];
        switch (focus) {
            case TimeUnit.YEAR: {
                let t = moment(cursor).add(-5, "year");
                for (let i=0; i < 12; i++) {
                    let active = now.isSame(t, "year");
                    let selected = !selectedDate? false : t.isSame(selectedDate.moment, "year");
                    let disabled = (options.future)? now.diff(t, "year") > 0 : (options.past) ? now.diff(t) < 1 : false;
                    let date = new DateModel(moment(t), active, selected, disabled);

                    t.add(1, "year");
                    times.push(date);
                }
            } break;
            case TimeUnit.MONTH: {
                let t = moment(cursor).month(0);
                for (let i=0; i < 12; i++) {
                    let active = now.isSame(t, "month");
                    let selected = !selectedDate? false : t.isSame(selectedDate.moment, "month"); 
                    let disabled = (options.future)? now.diff(t, "month") > 0 : (options.past) ? now.diff(t) < 1 : false;
                    let date = new DateModel(moment(t), active, selected,  disabled);

                    t.add(1, "month");
                    times.push(date);
                }
            }  break;
            case TimeUnit.DAY: {
                let firstOfMonth = moment(cursor).date(1);
                let t = moment(firstOfMonth).day(0);
                // Leave extra room of previous month if month starts on Sunday
                if (firstOfMonth.day() === 0) {
                    t.add(-7, 'day');
                }
                let weeks: Array<Array<DateModel>> = [[], [], [], [], [], []];
                for (let week of weeks) {
                    for (let i=0; i < 7; i++) {
                        let active = now.isSame(t, "day");
                        let selected = !selectedDate? false : t.isSame(selectedDate.moment, "day"); 
                        let disabled = (options.future)? now.diff(t, "day") > 0 : ((options.past) ? now.diff(t) < 1 : false);
                        let date = new DateModel(moment(t), active, selected, disabled);

                        week.push(date);
                        t.add(1, 'day');
                    }
                }
                times = weeks;
            }  break;
            case TimeUnit.HOUR: {
                let t = moment(cursor).hour(0);
                for (let i=0; i < 24; i++) {
                    let active = now.isSame(t, "hour");
                    let selected = !selectedDate? false : t.isSame(selectedDate.moment, "hour"); 
                    let disabled = (options.future)? now.diff(t, "hour") > 0 : (options.past) ? now.diff(t) < 1 : false;
                    let date = new DateModel(moment(t), active, selected, disabled);
                    t.add(1, "hour");
                    times.push(date);
                }
            }  break;
            case TimeUnit.MINUTE: {
                let t = moment(cursor).minute(0);
                for (let i=0; i < 12; i++) {
                    let active = now.isSame(t, "minute");
                    let selected = !selectedDate? false : t.isSame(selectedDate.moment, "minute"); 
                    let disabled = (options.future)? now.diff(t, "minute") > 0 : (options.past) ? now.diff(t) < 1 : false;
                    let date = new DateModel(moment(t), active, selected, disabled);
                    t.add(5, "minute");
                    times.push(date);
                }
            }  break;
        }

        return times;
    }
}