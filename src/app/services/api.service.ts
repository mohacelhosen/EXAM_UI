import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = "http://localhost:8080/api/exam-portal/";

  constructor(private http: HttpClient) { }

  userRegistration(data: any) {
    return this.http.post(this.baseUrl+"auth/signup", data);
  }

  login(loginData:any){
    return this.http.post(this.baseUrl+"auth/login",loginData);
  }

  getAllData(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  deleteUser(userEmail: string): Observable<any> {
    const url = `${this.baseUrl}/${userEmail}`;
    return this.http.delete(url);
  }

  getSingleUser(userEmail:string):Observable<any>{
    const url=`${this.baseUrl}/${userEmail}`;
    return this.http.get<User>(url);
  }
}
