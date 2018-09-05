import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'dp-pick',
  templateUrl: './pick.component.html',
  styleUrls: ['./pick.component.css']
})
export class PickComponent implements OnInit {
  @Input()
  pick: Date;

  @Output()
  onPick: EventEmitter<Date>;
  disabled: boolean;

  constructor() {
    this.onPick = new EventEmitter<Date>();
  }

  ngOnInit() {

  }

  choose(): void {
    this.onPick.emit(this.pick);
  }

}
