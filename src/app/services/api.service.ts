import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:8080/api/exam-portal/';

  constructor(private http: HttpClient) {}

  userRegistration(data: any) {
    return this.http.post(this.baseUrl + 'auth/signup', data);
  }

  login(loginData: any) {
    return this.http.post(this.baseUrl + 'auth/login', loginData);
  }

  getAllData(): Observable<User[]> {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if the token is fetched correctly
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User[]>(
      'http://localhost:8080/api/exam-portal/users/all',
      { headers }
    );
  }

  deleteUser(userEmail: string): Observable<any> {
    const url = `${this.baseUrl}/${userEmail}`;
    return this.http.delete(url);
  }

  getSingleUser(): Observable<any> {
    const userEmail = localStorage.getItem('email');
    const url = `${this.baseUrl}/find/${userEmail}`;
    return this.http.get<User>(url);
  }
}
