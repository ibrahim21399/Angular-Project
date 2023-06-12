import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core.module';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RatingModule } from 'primeng/rating';
import { PendingTeachersComponent } from './pending-teachers/pending-teachers.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    TeacherDetailComponent,
    PendingTeachersComponent,
    TeacherListComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SelectButtonModule,
    HttpClientModule,
    RatingModule,
    DialogModule,
    ButtonModule,
  ],
  providers: [DatePipe],
})
export class TeacherModule { }
