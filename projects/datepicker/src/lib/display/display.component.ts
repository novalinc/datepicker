import { Component, OnInit, Input } from '@angular/core';
import { TemporalType } from '../type';
import { IconDefinition, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dp-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  @Input() selectedDate: Date;
  @Input() temporal: TemporalType;
  iconCal: IconDefinition;

  constructor() {
    this.iconCal = faCalendarAlt;
  }

  ngOnInit() {
  }

}
