import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PickerComponent } from './picker.component';


@NgModule({
    imports: [ CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ PickerComponent ],
    exports: [ PickerComponent ]
})
export class PickerModule {

}