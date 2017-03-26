import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatepickerComponent } from './datepicker.component';
import { DatepickerService } from './datepicker.service';

@NgModule({
    imports: [ CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ DatepickerComponent ],
    exports: [ DatepickerComponent ],
    providers: [ DatepickerService ]
})
export class PickerModule {

}
