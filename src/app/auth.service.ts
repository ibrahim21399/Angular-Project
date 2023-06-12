import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Speaker } from './Model/Speaker';
import { SweetalertService } from './general/sweetalert.service';
import { Subject } from 'rxjs';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role?: string;
  isloggedin = false;
  username = "";
  decodedToken:any;

  private IsLogin = new Subject<any>();
  private name = new Subject<any>();
  private Role = new Subject<any>();
  url = "http://localhost:5000/api/";

  constructor(private http: HttpClient,private router:Router,private _alert:SweetalertService) {

   }

  Login(email: string, password: string) {
    this.http.post<any>(this.url + "login", { email: email, password: password }).subscribe(res => {
      localStorage.setItem("token", res.token)
      this.decodedToken = jwtDecode<any>(res.token);
      localStorage.setItem("name", this.decodedToken.name);
      localStorage.setItem("Role", this.decodedToken.role)
      localStorage.setItem("userId", this.decodedToken._id);
      this.username = email
      this.isloggedin = true;
      this.IsLogin.next(true);
      this.name.next(this.decodedToken.name);
      this.Role.next(this.decodedToken.role);
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

sendIsLogin(login:boolean = false){
  this.IsLogin.next(login)
}
getIsLogin(){
  return this.IsLogin.asObservable();
}
sendname(name:string =""){
  this.name.next(name);
}
getname(){
  return this.name.asObservable();
}
sendRole(role:string =""){
  this.Role.next(role);
}
getRole(){
  return this.Role.asObservable();
}
}
