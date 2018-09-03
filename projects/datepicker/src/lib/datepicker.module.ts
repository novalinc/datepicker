import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import { DisplayComponent } from './display/display.component';
import { PopupComponent } from './popup/popup.component';
import { CommonModule } from '@angular/common';
import { PickComponent } from './pick/pick.component';

@NgModule({
  imports: [ CommonModule
  ],
  declarations: [ DatepickerComponent, DisplayComponent, PopupComponent, PickComponent ],
  exports: [DatepickerComponent]
})
export class DatepickerModule { }
