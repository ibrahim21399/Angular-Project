import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SelectButtonModule} from 'primeng/selectbutton';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MapPickerComponentComponent } from './map-picker-component/map-picker-component.component';
import { ActiveStudentComponent } from './active-student/active-student.component';
import { TeacherModule } from './teacher/teacher.module';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { MessageComponent } from './messages/messages.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';






@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    MapPickerComponentComponent,
    ActiveStudentComponent,
    MessageComponent,
    StudentprofileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SelectButtonModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    TeacherModule,
    RatingModule,
    TableModule,



  ],
  exports:[
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    MessageComponent,
  ],
  providers:[]


})
export class CoreModule { }
