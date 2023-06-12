import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Student } from '../../Model/Student';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers:[ConfirmationService,MessageService]
})

export class StudentComponent implements OnInit {
  students:Student[]=[];
  selectedStudent:Student[]=[];
  studentDialog :boolean = false;
  //  student:Student = {_id:"0",username:"new",email:"new@website.com"};
  student:any ;
  studentSubmitted = false;
  oldId:number=0;

  constructor(private admin :AdminService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.admin.getallStudents().subscribe(students=>this.students = students)

  }

  deleteStudent(event:Event,id:number){
    this.confirmationService.confirm({
      target: <EventTarget>event.target,
      message: `Are you Sure you want to Delete The Student`,
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:"acceptdelete",

      accept: () => {
          this.admin.removeStudent(id);
          this.admin.getallStudents().subscribe(students=>this.students = students)
      },
      reject: () => {
          this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
      }

  });
  }

  editStudent(student:Student){
    this.student = {...student};
    this.oldId= this.student._id;
    this.studentDialog = true;
  }
  hideDialog() {
    this.studentDialog = false;
    this.studentSubmitted = false;
}
postEditedStudent(){
  this.studentSubmitted = true;
  this.admin.editStudent(this.oldId,this.student.email)
  .subscribe({
    complete:()=>{
      this.admin.getallStudents().subscribe(students=>this.students = students)
    }
  })
this.studentDialog = false;
}

}
