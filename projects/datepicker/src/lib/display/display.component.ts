import { Component, OnInit, Input } from '@angular/core';
import { TemporalType } from '../type';

@Component({
  selector: 'dp-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  @Input() selectedDate: Date;
  @Input() temporal: TemporalType;

  constructor() { }

  ngOnInit() {
  }

}
