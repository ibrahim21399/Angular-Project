import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rateing } from 'src/app/Model/rating';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-feedback',
  templateUrl: './teacher-feedback.component.html',
  styleUrls: ['./teacher-feedback.component.css']
})
export class TeacherFeedbackComponent implements OnInit {
  rate: rateing |any;
  TeacherId: string|any;
    constructor(private teacherService:TeacherService,  private activateRoute:ActivatedRoute) { 
      this.TeacherId=localStorage.getItem('userid');

    }

    ngOnInit(): void {
      this.loadTeacherDetails();
    }

    loadTeacherDetails() {
      const id = this.activateRoute.snapshot.params['id'];
      this.teacherService.TeaherFeedback(id).subscribe(response => {
        console.log(response);
        if (response) {
          console.log(response)
          this.rate = response;
          this.TeacherId=id;
        }
      }, error => {
        console.log(error);
      });
    }

}