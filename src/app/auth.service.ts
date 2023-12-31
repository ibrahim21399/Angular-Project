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
  url = "http://localhost:5000/api/";


  role?: string;
  userId: string | null = null; // initialize the userId property to null
  isloggedin = false;
  email = "";
  decodedToken:any; 
  private IsLogin = new Subject<any>();
  private name = new Subject<any>();
  private Role = new Subject<any>();


  constructor(private http: HttpClient,private router:Router,private _sweetalertService:SweetalertService) {

   }

  Login(email: string, password: string) {
    this.http.post<any>(this.url + "login", { email: email, password: password }).subscribe( res => {
      console.log(res)
      localStorage.setItem("jwt_token", res.token)
      this.decodedToken = jwtDecode<any>(res.token);
      localStorage.setItem("name", this.decodedToken.name);
      localStorage.setItem("Role", this.decodedToken.role)
      localStorage.setItem("userId", this.decodedToken._id); // store
      this.email = email
      this.isloggedin = true;
      this.IsLogin.next(true);
      this.name.next(this.decodedToken.name);
      this.Role.next(this.decodedToken.role);
      this.userId = this.decodedToken._id;

      console.log(this.decodedToken.role)
      if (this.decodedToken.role=="teacher")
      this.router.navigateByUrl(`/teacherProfile/${this.decodedToken._id}`)
      else if(this.decodedToken.role=="admin")
      this.router.navigateByUrl(`/PendingTeachers`)
      else
        this.router.navigateByUrl(`/`)
    },error => {
    this._sweetalertService.RunAlert(error.error.message,false);
    })
  }
logout(){
  this.isloggedin = false;
  localStorage.clear();
  this.email =""
}
GetName():any{
return this.decodedToken.name;
}
GetRole():any{
  return this.decodedToken.role;
}
GetId(): any {
  // Check if the decodedToken exists and contains the _id field
  if (this.decodedToken && this.decodedToken._id) {
    return this.decodedToken._id;
  } else {
    return null;
  }
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
