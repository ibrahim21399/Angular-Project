import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Event as itiEvent } from '../Model/Event';
import { Speaker } from '../Model/Speaker';
import { Student } from '../Model/Student';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
studentUri:string ="http://localhost:9090/api/student/";
SpeakerUri:string ="http://localhost:9090/api/speaker/";
EventUri:string ="http://localhost:9090/api/event/"
  constructor(private http:HttpClient) { }
  getallStudents(){
   
  return this.http.get<Student[]>(this.studentUri).pipe(map(studunts=> studunts))
  }
  
  removeStudent(id:number){
    this.http.delete(this.studentUri+id).subscribe();
  }
  editStudent(id:number,newEmail:string){
    return this.http.put(this.studentUri+id,{email:newEmail})

  }
//speaker
getallSpeakers(){
   
  return this.http.get<Speaker[]>(this.SpeakerUri)
  }
  
  removeSpeaker(username:string){
    this.http.delete(this.SpeakerUri+username).subscribe();
  }
  editSpeaker(username:string,sp:any){
    return this.http.put(this.SpeakerUri+username,sp)

  }

  CreateEvent(formdata:any){
 let event = {
    ...formdata,
    mainSpeaker:formdata.mainSpeaker._id,
    otherSpeakers:formdata.otherSpeakers.map((sp:any)=>sp._id),
    students:formdata.students.map((sd:any)=>sd._id)
 } 
 console.log(event)
  return this.http.post(this.EventUri+"create",event)
  }
  getallEvents(){
   
    return this.http.get<itiEvent[]>(this.EventUri)
    }

    removeitiEvent(id :number){
    return  this.http.delete(this.EventUri+id);
    }

    edititiEvent(id:number,eve:any){
      return this.http.put(this.SpeakerUri+id,eve)
  
    }
}

