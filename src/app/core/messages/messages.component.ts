import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { message } from 'src/app/Model/message';
import { AuthService } from 'src/app/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessageComponent implements OnInit {
  studentId: string="";
  teacherId: string="";
  messages: message[]=[];
  newMessage: message = { teacher: '', student: '', message: '', sentDate: new Date(), isTeacher: false };
  myRole:string|any=""; 
  user:any; 

  constructor(private route: ActivatedRoute, private messageService: MessageService,private auth:AuthService,private teacherService:TeacherService,private stdSer:StudentService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = params['studentId'];
      this.teacherId = params['teacherId'];
      console.log(this.studentId)
      console.log( this.teacherId)
    this.myRole = localStorage.getItem('Role');
if (this.myRole!="teacher")
{
  this.loadTeacherDetails()
}
else{
  this.loadStdDetails()

}

  

      this.getAll();
    });
  }

  getAll():void{
    this.messageService.getMessages(this.studentId, this.teacherId)
    .subscribe(data => {
      this.messages = data;
      console.log(this.messages)
    });
  }
  sendMessage(): void {
    this.newMessage.student = this.studentId;
    this.newMessage.teacher = this.teacherId;
    this.newMessage.sentDate = new Date();
    if (this.myRole=="teacher")
{
  this.newMessage.isTeacher = true;
}
console.log(this.newMessage)
    this.messageService.sendMessage(this.newMessage)
      .subscribe(data => {
        this.messages.push(data);
        this.newMessage.message = '';
        this.getAll();
      });
  }
  checkArray(): boolean {
    return Array.isArray(this.user);
  }
  loadTeacherDetails() {
    this.teacherService.getTeacherById(this.teacherId).subscribe(response => {
      if (response) {
        console.log(response);
        this.user=response;           

      }
    }, error => {
      console.log(error);
    });
  }
  loadStdDetails() {
    this.stdSer.getStudentById(this.studentId).subscribe(response => {
      if (response) {
        this.user=response;           
console.log(response)
      }
    }, error => {
      console.log(error);
    });
  }

}