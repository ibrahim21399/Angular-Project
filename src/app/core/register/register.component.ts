import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
public form:UntypedFormGroup;
roles:any[]
selectedRole: string = "student";
url ="http://localhost:5000/api/";
@ViewChild("address") addressDiv!:ElementRef;


  constructor( 
    private fb:UntypedFormBuilder,
    private http:HttpClient,
    private router:Router
    ) {


this.roles = [{label: 'Student', value: 'student'}, {label: 'teacher', value: 'teacher'},];
this.form = this.fb.group( {
  name:["",Validators.required],
  password:"",
  email:"",

      price:"",
      field:"",
      experience:""
    }
    )
}



submit(){
  
  if (this.selectedRole == "student") {
    this.http.post(this.url+"students",this.form.getRawValue())
    .subscribe(res=>{
      this.router.navigateByUrl("/login")
    })
  }
   else {
    console.log(this.form.getRawValue())
    
    this.http.post(this.url+"speaker/register",this.form.getRawValue())
    .subscribe(res=>{
      
      
      this.router.navigateByUrl("/login")
      
      
    })
  }
}
updateGUI(){
  
if (this.selectedRole!="student") 
{ 

  this.addressDiv.nativeElement.style = "display:none" 
  

} else {
  this.addressDiv.nativeElement.style = "display:block" 
}
}


    
  
  ngOnInit(): void {
  }

}
