import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DateWrapper } from '../type';

@Component({
  selector: 'dp-pick',
  templateUrl: './pick.component.html',
  styleUrls: ['./pick.component.css']
})
export class PickComponent implements OnInit {
  @Input()
  pick: DateWrapper;

  @Output()
  onSelect: EventEmitter<Date>;

  constructor() {
    this.onSelect = new EventEmitter<Date>();
  }

  ngOnInit() {

  }

  select(): void {
    console.debug('pick event:', this.pick.value);
    this.onSelect.emit(this.pick.value);
  }

}
