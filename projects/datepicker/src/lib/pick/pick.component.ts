import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dp-pick',
  templateUrl: './pick.component.html',
  styleUrls: ['./pick.component.css']
})
export class PickComponent implements OnInit {

  @Output() 
  onEvent: EventEmitter<Date>; 
  
  pick: Date;
  disabled: boolean;


  constructor() { }

  ngOnInit() {
  }

}
