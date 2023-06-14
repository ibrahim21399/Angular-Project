import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './core/home/home.component';

import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { ErrorComponent } from './error/error.component';
import { LoginGuard } from './login.guard';
import { ActiveStudentComponent } from './core/active-student/active-student.component';
import { PendingTeachersComponent } from './core/teacher/pending-teachers/pending-teachers.component';
import { TeacherListComponent } from './core/teacher/teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './core/teacher/teacher-detail/teacher-detail.component';
import { TeacherProfileComponent } from './core/teacher/teacher-profile/teacher-profile.component';
import { MessageComponent } from './core/messages/messages.component';
import { TeacherFeedbackComponent } from './core/teacher/teacher-feedback/teacher-feedback.component';
import { StudentprofileComponent } from './core/studentprofile/studentprofile.component';



const routes: Routes = [
  {path:"login",component: LoginComponent},
  {path:"register",component: RegisterComponent},
  {path:"admin",component:AdminDashboardComponent,canActivate:[LoginGuard]},
  {path:"error",component:ErrorComponent},
  {path:"students",component: ActiveStudentComponent},
  {path:"PendingTeachers",component: PendingTeachersComponent},
  {path:"TeachersList",component: TeacherListComponent},
  {path: "teacherDetail/:id", component: TeacherDetailComponent},
  {path: "teacherProfile/:id", component: TeacherProfileComponent},
  {path: "studentProfile/:id", component: StudentprofileComponent},
  { path: 'Contact/:studentId/:teacherId', component: MessageComponent },
  { path: 'feedbacks/:id', component: TeacherFeedbackComponent },
  {path:"error",component:ErrorComponent},
  {path:"",component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
