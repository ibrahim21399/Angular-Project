import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Field } from '../Model/Field';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private _fields=  "http://localhost:5000/api/";



  constructor(private http: HttpClient) { }

  getFields(): Observable<Field[]> {
    return this.http.get<Field[]>(`${this._fields}`);
  }

  getField(id: string): Observable<Field> {
    const url = `${this._fields}/${id}`;
    return this.http.get<Field>(url);
  }

  addField(field: Field): Observable<Field> {
    return this.http.post<Field>(this._fields, field);
  }

  updateField(field: Field): Observable<Field> {
    return this.http.put<Field>(`${this._fields}${field._id}`, field);
  }

  deleteField(id: string): Observable<Field> {
    return this.http.delete<Field>(`${this._fields}${id}`);
  }


}
