import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import { DisplayComponent } from './display/display.component';
import { PopupComponent } from './popup/popup.component';
import { CommonModule } from '@angular/common';
import { DayComponent } from './popup/day/day.component';
import { MonthComponent } from './popup/month/month.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [DatepickerComponent, DisplayComponent, PopupComponent, DayComponent, MonthComponent],
  exports: [DatepickerComponent]
})
export class DatepickerModule {

}
