import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './core/home/home.component';

import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { ErrorComponent } from './error/error.component';
import { LoginGuard } from './login.guard';
import { FieldComponent } from './core/field/field.component';
import { ActiveStudentComponent } from './core/active-student/active-student.component';
import { PendingTeachersComponent } from './core/teacher/pending-teachers/pending-teachers.component';

const routes: Routes = [
  {path:"login",component: LoginComponent},
  {path:"register",component: RegisterComponent},
  {path:"admin",component:AdminDashboardComponent,canActivate:[LoginGuard]},
  {path:"error",component:ErrorComponent},
  {path:"Fields",component: FieldComponent},
  {path:"students",component: ActiveStudentComponent},
  {path:"PendingTeachers",component: PendingTeachersComponent},
  // {path:"TeachersList",component: TeachersListComponent},
  // {path:"Admins",component: AdminComponent},

  // {path: "teacherDetail/:id", component: TeacherDetailComponent},
  // {path: "teacherProfile/:id", component: TeacherProfileComponent},
  // { path: 'messages/:studentId/:teacherId', component: MessageComponent },
  {path:"error",component:ErrorComponent},
  {path:"",component:HomeComponent},

// { path: '**', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
