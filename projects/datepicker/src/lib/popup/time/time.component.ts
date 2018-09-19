import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { DatepickerService } from '../../service/datepicker.service';
import { IconDefinition, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'dp-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

    upIcon: IconDefinition = faAngleUp;
    downIcon: IconDefinition = faAngleDown;

    time: Date;

    constructor(private _service: DatepickerService) {

    }

    ngOnInit() {
        this._service.pick$.subscribe(d => {
            this.time = d;
        });
    }

    changeHour(up: boolean): void {

        let hour = this._change(this._service.pickedDate.getHours(), 24, up);

        let time = moment(this._service.pickedDate)
            .hour(hour)
            .toDate();
        this._service.pickDate(time);
    }

    changeMinute(up: boolean): void {

        let minute = this._change(this._service.pickedDate.getMinutes(), 60, up);

        let time = moment(this._service.pickedDate)
            .minute(minute)
            .toDate();
        this._service.pickDate(time);
    }

    // TODO: test this method
    private _change(num: number, max: number, up: boolean): number {

        // Use large increments for bigger ranges
        let amt = max > 24 ? 5 : 1;

        if (up) {
            if (amt > 1 && (num % amt) > 0) {
                return num + (amt - num % amt);
            }
            return (num + amt) % max;
        } else {
            if (num - amt < 0) {
                return amt > 1 ? max - amt : max - 1;
            }
            return num - amt;
        }
    }
}
