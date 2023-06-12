import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Speaker } from 'src/app/Model/Speaker';
import { Student } from 'src/app/Model/Student';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
 speaker!:Speaker;
 student!:Student;
 speakerDialog :boolean = false;
 speakerSubmitted = false; 

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
    if (this.auth.role=="speaker") {
      console.log(this.speaker,this.auth.role);
    }
  }

  editSpeaker(){
    this.speakerDialog = true;
  }
  hideDialog() {
    this.speakerDialog = false;
    this.speakerSubmitted = false;
}
postEditedSpeaker(){
  this.speakerSubmitted = true;
  // this.auth.speakrOwnProfEdit(this.speaker)
  // .subscribe({
  //   complete:()=>{
     
  //   }
  // })
this.speakerDialog = false;
}
}
