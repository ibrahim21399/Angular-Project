import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../Model/Student';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../Model/serviceResponse';

const APIUrl= "http://localhost:5000/api/";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _students=`${APIUrl}students/`;
  private _Block=`${APIUrl}BlockStudent/`;
  private _Active=`${APIUrl}ActiveStudent/`;
  private _StudentById=`${APIUrl}students/`;

  constructor(private http:HttpClient) { }
  StudentRegiser(student:Student):Observable<ServiceResponse<boolean>>{
    return this.http.post<ServiceResponse<boolean>>(`${this._students}`,student)
  }
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this._students}`);
  }

  Block(id:string): Observable<Student> {
    return this.http.get<Student>(`${this._Block}${id}`);
  }

  Active(id:string): Observable<Student> {
    return this.http.get<Student>(`${this._Active}${id}`);
  }
  Delete(id:string): Observable<ServiceResponse<boolean>> {
    return this.http.delete<ServiceResponse<boolean>>(`${this._students}${id}`);
  }
  getStudentById(userId:string):Observable<Student>{
    return this.http.get<Student>(`${this._StudentById}${userId}`);
  }
}
