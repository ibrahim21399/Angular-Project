import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/Model/Student';
import { SweetalertService } from 'src/app/general/sweetalert.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-active-student',
  templateUrl: './active-student.component.html',
  styleUrls: ['./active-student.component.css']
})
export class ActiveStudentComponent implements OnInit {

  students: Student[]=[];
  constructor(private studentService: StudentService, private _sweetalertService: SweetalertService) { }

  ngOnInit(): void {
    this.getAllActive();
  }

  getAllActive(): void {
    this.studentService.getAllStudents()
      .subscribe(students => {
        this.students = students;
        console.log(students);
      });

  }


  Block(id:string):void{
this.studentService.Block(id).subscribe(a=>{
  this.getAllActive();

})
  }
  Active(id:string):void{
    this.studentService.Active(id).subscribe(a=>{
      this.getAllActive();
    })
}
Delete(id:string):void{
  this.studentService.Delete(id).subscribe(a=>{
    console.log(a);
    this._sweetalertService.RunAlert(a.message,true);

    this.getAllActive();
  })
}

}
