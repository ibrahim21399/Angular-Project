import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from 'src/app/Model/Teacher';
import { AuthService } from 'src/app/auth.service';
import { SweetalertService } from 'src/app/general/sweetalert.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit {

  teacher: Teacher |any;
  TeacherId: string="";
  StudentId: string|any;
  IsEnrollerd:boolean=false;
  Role:any;
  starWidth: number = 0;
  IsRated:boolean=false;
  studentname:any;
  selectedRating: number=0;
  feedback:string="";

  @Output() ratingSubmitted = new EventEmitter<number>();


  constructor(private teacherService:TeacherService,  private activateRoute:ActivatedRoute,private authService:AuthService,
    private _sweetalertService: SweetalertService,private router: Router) {
      this.loadTeacherDetails();
      this.TeacherId=this.activateRoute.snapshot.params['id'];
      this.StudentId = localStorage.getItem('userId');
      this.studentname = localStorage.getItem('name');
      this.Role = localStorage.getItem('Role');
    }

  ngOnInit(): void {
    this.loadTeacherDetails();
    this.TeacherId=this.activateRoute.snapshot.params['id'];
    this.StudentId = localStorage.getItem('userId');
    this.studentname = localStorage.getItem('name');
    this.Role = localStorage.getItem('Role');

  }

  loadTeacherDetails() {
    const id = this.activateRoute.snapshot.params['id'];
    this.teacherService.getTeacherById(id).subscribe(response => {
      if (response) {
        console.log(this.StudentId)
        console.log(this.TeacherId)
        console.log(response)
        this.teacher = response;
        this.teacher = this.teacher[0];
        console.log(this.teacher.studentEnrolled._id);
        if (Array.isArray(this.teacher.studentEnrolled) && this.teacher.studentEnrolled.some((student: any) => student.name === this.studentname)) {
          this.IsEnrollerd = true;
        }

      }
    }, error => {
      console.log(error);
    });
  }
  Enroll():void{
    this.teacherService.Enroll(this.TeacherId,this.StudentId).subscribe(a=>{
      this.IsEnrollerd=true;
      console.log(a);
      this._sweetalertService.RunAlert(a.data.message,true);
    },error=>{
      this._sweetalertService.RunAlert(error.error.message,false);

    });
      }
  SendMessage(): void {
    this.router.navigate(['/Contact', this.StudentId, this.TeacherId]);
  }





  rate() {
    this.selectedRating;
    this.feedback;

    this.teacherService.rate(this.TeacherId,this.selectedRating,this.feedback,this.StudentId).subscribe(a=>{this.IsRated=true;
      this.loadTeacherDetails();
    })

  }

}
