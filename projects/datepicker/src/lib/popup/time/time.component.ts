import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { DatepickerService } from '../../service/datepicker.service';

@Component({
    selector: 'dp-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

    hours: number[];
    minutes: number[];

    constructor(private _service: DatepickerService) {
        this.hours = [];
        this.minutes = [];
        for (let h = 0; h < 24; h++) {
            this.hours.push(h);
        }

        for (let m = 0; m < 60; m += 5) {
            this.minutes.push(m);
        }
    }

    ngOnInit() {

    }

    pickHour(event: any): void {
        console.debug('picking hour: ', event.target.value);
        let time = moment(this._service.pickedDate)
            .hour(event.target.value)
            .toDate();
        this._service.pickDate(time);
    }

    pickMinute(event: any): void {
        console.debug('picking minute: ', event.target.value);
        let time = moment(this._service.pickedDate)
            .minute(event.target.value)
            .toDate();
        this._service.pickDate(time);
    }
}
