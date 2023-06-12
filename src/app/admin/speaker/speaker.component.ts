import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Speaker } from '../../Model/Speaker';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css'],
  providers:[ConfirmationService,MessageService]
})


export class SpeakerComponent implements OnInit {

  speakers:Speaker[]=[];
  selectedSpeaker:Speaker[]=[];
  speakerDialog :boolean = false;
  speaker:Speaker = {_id:0,username:"new",email:"new@website.com",password:"" ,address:{city:"city",street:"street",building:"building"} };
  speakerSubmitted = false; 
  oldId:number=0;
  constructor(private admin :AdminService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.admin.getallSpeakers().subscribe(speakrs=>{
      this.speakers =speakrs;

    })
  }

  deleteSpeaker(event:Event,username:string){
    this.confirmationService.confirm({
      target: <EventTarget>event.target,
      message: `Are you Sure you want to Delete The Speaker`,
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:"acceptdelete",
    
      accept: () => {
       console.log(username);
       
        
          this.admin.removeSpeaker(username);
          this.admin.getallSpeakers().subscribe(speakers=>this.speakers = speakers)
      },
      reject: () => {
          this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
      }
      
  });
  }

  editSpeaker(speaker:Speaker){
    this.speaker = {...speaker};
    this.oldId= this.speaker._id; 
    this.speakerDialog = true;
  }
  hideDialog() {
    this.speakerDialog = false;
    this.speakerSubmitted = false;
}
postEditedSpeaker(){
  this.speakerSubmitted = true;
  this.admin.editSpeaker(this.speaker.username,this.speaker)
  .subscribe({
    complete:()=>{
      this.admin.getallSpeakers().subscribe(speakers=>this.speakers = speakers)
    }
  })
this.speakerDialog = false;
}
}
