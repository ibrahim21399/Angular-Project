import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Position } from 'src/app/Model/Position'


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

public Latitude:string = "0";
public Longitude: string = "0";
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
  Phone:"",
  pricePerHour:"",
  field:"",
  experienceYears:"",
  Longitude:"",
  Latitude:"",
    }
    )
}



submit(){
  
  if (this.selectedRole == "student") {
    this.http.post(this.url+"students",this.form.getRawValue())
    .subscribe(res=>{
      console.log(res)
      this.router.navigateByUrl("/login")
    })
  }
   else {
    this.form.patchValue({
      Latitude: this.Latitude,
      Longitude: this.Longitude
    });
    console.log(this.form.getRawValue())
    
    this.http.post(this.url+"teachers",this.form.getRawValue())
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
    this.getLocation();
  }


  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            " Longitude: " + position.coords.longitude);
          this.Latitude = position.coords.latitude.toString();
          this.Longitude = position.coords.longitude.toString();
          console.log(this.Latitude);
          console.log(this.Longitude);
          this.form.patchValue({
            Latitude: this.Latitude,
            Longitude: this.Longitude
          });
        }
      },
        (error) => {
          return console.log(error);
        });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
