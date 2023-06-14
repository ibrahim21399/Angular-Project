import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServiceResponse } from 'src/app/Model/serviceResponse';
import { Teacher } from '../Model/Teacher';
import { rateing } from '../Model/rating';

const Base= "http://localhost:5000/api/"

@Injectable({
  providedIn: 'root'
})


export class TeacherService {

  private _Teachers=`${Base}teachers/`;
  private _HighstRate=`${Base}allTeachers/highRate/`;
  private _apiGetAllNotAcceptedTeachers=`${Base}allTeachers/highRate`;
  private _activeteachers=`${Base}activateteacher/`;
  private _enrollments = `${Base}EnrollStudent/`;
  private _rate = `${Base}teachers/rating/`;
  private _feedback = `${Base}teacherFeedbackandRate/`;




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
    return this._httpClient.post<ServiceResponse<boolean>>(`${this._activeteachers}${id}`,id)
  }

  getTeacherById(userId:string):Observable<Teacher>{
    return this._httpClient.get<Teacher>(`${this._Teachers}${userId}`)
  }

  Enroll(teacherId: string, studentId: string): Observable<ServiceResponse<any>> {
    const enrollment = { TeacherId: teacherId, StudentId: studentId };
    return this._httpClient.post<ServiceResponse<any>>(`${this._enrollments}`, enrollment);
  }

  rate(teacherId: string,rateVal:Number,feedback:string,studentId:string): Observable<ServiceResponse<any>> {
    const rateValue = { rate:rateVal, feedback:feedback , studentId:studentId};
    return this._httpClient.post<ServiceResponse<any>>(`${this._rate}${teacherId}`,rateValue);
  }
  TeaherFeedback(teacherId:string):Observable<ServiceResponse<rateing[]>>{
    return this._httpClient.get<ServiceResponse<rateing[]>>(`${this._feedback}${teacherId}`);

  }
}
