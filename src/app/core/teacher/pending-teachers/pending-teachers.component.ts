import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/Model/Teacher';
import { SweetalertService } from 'src/app/general/sweetalert.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pending-teachers',
  templateUrl: './pending-teachers.component.html',
  styleUrls: ['./pending-teachers.component.css']
})
export class PendingTeachersComponent implements OnInit {

  Teachers: Teacher[]=[];
  constructor(private teacherService: TeacherService, private _sweetalertService: SweetalertService) { }

  ngOnInit(): void {
    this.getAllPending();
  }

  getAllPending(): void {
    this.teacherService.GetNotAceptedTeachers()
      .subscribe(teachers => {
        this.Teachers = teachers.data;
      });



  }

  Accept(id:string):void{
    this.teacherService.UpdateActivationOfTeacher(id).subscribe(a=>{
      this._sweetalertService.RunAlert(a.message,true);
      this.getAllPending();

    })
}



}
