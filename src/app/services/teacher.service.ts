import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServiceResponse } from 'src/app/Model/serviceResponse';
import { Teacher } from '../Model/Teacher';

const Base= "http://localhost:5000/api/"

@Injectable({
  providedIn: 'root'
})


export class TeacherService {

  private _Teachers=`${Base}teachers/`;
  private _HighstRate=`${Base}allTeachers/highRate/`;
  private _apiGetAllNotAcceptedTeachers=`${Base}allTeachers/highRate`;
  private _activeteachers=`${Base}activateteacher/`;
  private _rate = `${Base}teacherFeedbackandRate/`;




  constructor(private _httpClient:HttpClient) { }
  TeacherRegiser(teacher:Teacher):Observable<ServiceResponse<boolean>>{
    return this._httpClient.post<ServiceResponse<boolean>>(`${this._Teachers}`,teacher)
  }
  GetActiveTeachers():Observable<ServiceResponse<Teacher[]>>{
    return this._httpClient.get<ServiceResponse<Teacher[]>>(`${this._Teachers}`)
  }
  getTeachersWithHighestRate() {
    return this._httpClient.get<ServiceResponse<Teacher[]>>(`${this._HighstRate}`)
  }
  GetNotAceptedTeachers():Observable<ServiceResponse<Teacher[]>>{
    return this._httpClient.get<ServiceResponse<Teacher[]>>(`${this._apiGetAllNotAcceptedTeachers}`)
  }
  UpdateActivationOfTeacher(id:string):Observable<ServiceResponse<boolean>>{
    return this._httpClient.get<ServiceResponse<boolean>>(`${this._activeteachers}${id}`)
  }

  DeleteTeacher(userId:string):Observable<ServiceResponse<boolean>>{
    return this._httpClient.delete<ServiceResponse<boolean>>(`${this._Teachers}${userId}`)
  }

  getTeacherById(userId:string):Observable<Teacher>{
    return this._httpClient.get<Teacher>(`${this._Teachers}${userId}`)
  }



  rate(teacherId: string,rateVal:Number): Observable<ServiceResponse<any>> {
    return this._httpClient.get<ServiceResponse<any>>(`${this._rate}${teacherId}/${rateVal}`);
  }
}
