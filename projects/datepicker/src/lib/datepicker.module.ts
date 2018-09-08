import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import { DisplayComponent } from './display/display.component';
import { PopupComponent } from './popup/popup.component';
import { CommonModule } from '@angular/common';
import { DayComponent } from './popup/day/day.component';

@NgModule({
  imports: [CommonModule
  ],
  declarations: [DatepickerComponent, DisplayComponent, PopupComponent, DayComponent],
  exports: [DatepickerComponent]
})
export class DatepickerModule { }
