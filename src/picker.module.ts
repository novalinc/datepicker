import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PickerComponent } from './picker.component';
import { PickerService } from './picker.service';

@NgModule({
    imports: [ CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ PickerComponent ],
    exports: [ PickerComponent ],
    providers: [ PickerService ]
})
export class PickerModule {

}
