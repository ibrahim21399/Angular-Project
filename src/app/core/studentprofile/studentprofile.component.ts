import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/Model/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {
  std: Student |any;
  StudentId: string="";
    constructor(private stdService:StudentService,  private activateRoute:ActivatedRoute) { }

    ngOnInit(): void {
      this.loadTeacherDetails();
    }

    loadTeacherDetails() {
      const id = this.activateRoute.snapshot.params['id'];
      this.stdService.getStudentById(id).subscribe(response => {
        if (response) {
          this.std = response;
          this.std = this.std[0];
          console.log(response);
          this.StudentId=id;
        }
      }, error => {
        console.log(error);
      });
    }

}