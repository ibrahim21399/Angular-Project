import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student/student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SpeakerComponent } from './speaker/speaker.component';
import { EventComponent } from './event/event.component';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import { ChipModule } from 'primeng/chip';




@NgModule({
  declarations: [
    StudentComponent,
    SpeakerComponent,
    EventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    BrowserAnimationsModule,
    ConfirmPopupModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule,
    CardModule,
    ChipModule,
  ],
  exports:[
    StudentComponent,
    SpeakerComponent,
    EventComponent
  ]
  
})
export class AdminModule { }
