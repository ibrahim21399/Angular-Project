import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Teacher } from 'src/app/Model/Teacher';
import { AuthService } from 'src/app/auth.service';
import { TeacherService } from 'src/app/services/teacher.service';
import * as L from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-picker-component',
  templateUrl: './map-picker-component.component.html',
  styleUrls: ['./map-picker-component.component.css']
})
export class MapPickerComponentComponent implements OnInit {

  highestRatedTeachers: Teacher[] = [];
  teachers: Teacher[]=[];
  
  private userLatitude: number= 0 ;
  private userLongitude: number = 0 ;
  role:any;
  map: any;
  name:any;
  Id:any;
  islogin: any;
  authentic:boolean=false;



  @Input('rating') private rating: number = 3;
  @Input('starCount') private starCount: number = 5;
  @Input('color') public color: string = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  private snackBarDuration: number = 2000;
  public ratingArr = [];

  constructor(public auth:AuthService, private teacherService:TeacherService,
      public login:AuthService,public router:Router) {

      if(localStorage.getItem("jwt_token")){
        this.login.isloggedin = true;
      }
      else{
        this.login.isloggedin = false;
      }
      this.name = localStorage.getItem("name");
      this.role=localStorage.getItem("Role");
      this.Id = localStorage.getItem("Id");


     }

  ngOnInit() {
    this.getActivatedTeachers();
    this.getTeachersWithHighstRate();
    this.role =localStorage.getItem('Role');
    this.name = localStorage.getItem("name");
    this.login.getname().subscribe(res=>{
      this.name =res;
    })
    this.login.getIsLogin().subscribe(res=>{
      this.islogin = res;
      
      
    });
    
  }

  getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.userLatitude = position.coords.latitude;
        this.userLongitude = position.coords.longitude;
        this.initializeMap();
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }

  initializeMap() {
    L.Icon.Default.imagePath = "./assets/images/";

    this.map = L.map('map').setView([this.userLatitude, this.userLongitude], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);

    // Place a marker at the user's location
    L.marker([this.userLatitude, this.userLongitude])
      .addTo(this.map)
      .bindPopup('Your Location');

    // Place markers for nearby teachers
    this.teachers.forEach((teacher) => {
      if(teacher.Latitude != undefined){
      L.marker([teacher.Latitude, teacher.Longitude])
        .addTo(this.map)
        .bindPopup(`<strong>${teacher.name}</strong><br>Rating: ${teacher.averageRating}/5`);
      }
    });

  }


  getTeachersWithHighstRate() {
    this.teacherService.getTeachersWithHighestRate()
      .subscribe(response => {
        if (response) {
          this.highestRatedTeachers = response.data.slice(0, 8);
        }
      }, error => {
        console.log(error);
      });
  }


  getActivatedTeachers(){
    this.teacherService.GetActiveTeachers()
      .subscribe(response => {
      if (response) {
        console.log(response);
        this.teachers = response.data;
        this.getUserLocation();
      }
    }, error => {
      console.log(error);

    });

  }


}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
