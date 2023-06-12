import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Speaker } from './Model/Speaker';
import { SweetalertService } from './general/sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role?: string;
  isloggedin = false;
  username = "";
  url = "http://localhost:5000/api/";

  constructor(private http: HttpClient,private router:Router,private _alert:SweetalertService) {

   }

  Login(email: string, password: string) {
    this.http.post<any>(this.url + "login", { email: email, password: password }).subscribe(res => {
      localStorage.setItem("token", res.token)
      this.username = email
      this.isloggedin = true;
      this._alert.RunAlert(res.message,true);

      this.router.navigateByUrl("/")
      this.role= res.role;
    },error=>{
      this._alert.RunAlert(error.error.message,false);
    })
  }
logout(){
  this.isloggedin = false;
  localStorage.removeItem("token")
  this.username =""
}
 speakrOwnProfInof (){
  return this.http.get<Speaker>(this.url+"Speaker/getownprofile")
  
 }

 speakrOwnProfEdit (speaker:Speaker){
  return this.http.post(this.url+"Speaker/editownprofile",speaker)
  
 }
}
