import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators,  } from '@angular/forms';
import { Student } from 'src/app/Model/Student';
import { AdminService } from 'src/app/services/admin.service';
import {Speaker} from "../../Model/Speaker";
import {Event as itiEvent} from "../../Model/Event";
import {ConfirmationService, MessageService} from 'primeng/api';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers:[ConfirmationService,MessageService]
})
export class EventComponent implements OnInit {
  public form:UntypedFormGroup;
  public mainSpeaker:Speaker = {_id:0,username:"new",email:"new@website.com",password:"password", address:{city:"city",street:"street",building:"building"} };
  public Speakers:Speaker[] =[];
  public otherSpeakers:Speaker[] =[];
  public students:Student[]=[];
  public selectedStudent:Student[]=[];
  public events:itiEvent[]=[];

  eventDialog :boolean = false;
  event!:itiEvent;

  constructor(
    private fb: UntypedFormBuilder,
    private admin: AdminService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private changeDetection: ChangeDetectorRef) {
    this.form = this.fb.group({
      title: ["", Validators.required],
      date: "",
      mainSpeaker: "",
      otherSpeakers: [],
      students: [],
    });


   }

  ngOnInit(): void {
    this.admin.getallSpeakers().subscribe(speakrs=>{
      this.Speakers =speakrs;

    });
    this.admin.getallStudents().subscribe(sts=>{
      this.students=sts;

    });
    this.admin.getallEvents().subscribe(eves=>{
      this.events=eves;

    });
  }

  submit(){
  this.admin.CreateEvent(this.form.getRawValue()).subscribe(()=>{
    this.admin.getallEvents().subscribe(eves=>{
      this.events=eves;
    });
  })

  }

  deleteitiEvent(event:Event,id:number){
    this.confirmationService.confirm({
      target: <EventTarget>event.target,
      message: `Are you Sure you want to Delete The EVENT`,
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: "acceptdelete",

      accept: () => {



        this.admin.removeitiEvent(id).subscribe(()=>{
          this.admin.getallEvents().subscribe(eves => {
            this.events = eves;
          });
        })

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }

    });
  }


  edititiEvent(event:itiEvent){
    this.event = {...event};

    this.eventDialog = true;
  }

  hideDialog() {
    this.eventDialog = false;
    // this.speakerSubmitted = false;
}
postEditeditiEvent(){
  // this.speakerSubmitted = true;
  this.admin.edititiEvent(this.event._id,this.event)
  .subscribe({
    complete:()=>{
      this.admin.getallEvents().subscribe(eves => {
        this.events = eves;
       

      });
    }
  })
this.eventDialog = false;
}

}
