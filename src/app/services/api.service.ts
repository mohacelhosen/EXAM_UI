import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = "http://localhost:8080/api/user/signup";
  private allApiUrl: string = "http://localhost:8080/api/user/users/all";
  private deleteApiUrl = 'http://localhost:8080/api/user/delete';
  private singleUserApiUrl="http://localhost:8080/api/user/find";

  constructor(private http: HttpClient) { }

  userRegistration(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getAllData(): Observable<User[]> {
    return this.http.get<User[]>(this.allApiUrl);
  }

  deleteUser(userEmail: string): Observable<any> {
    const url = `${this.deleteApiUrl}/${userEmail}`;
    return this.http.delete(url);
  }

  getSingleUser(userEmail:string):Observable<any>{
    const url=`${this.singleUserApiUrl}/${userEmail}`;
    return this.http.get<User>(url);
  }
}
