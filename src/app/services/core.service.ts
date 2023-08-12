import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {

  constructor( private http: HttpClient) {}

  private tokenValidationUrl = 'http://localhost:8080/api/exam-portal/auth/token'; // Replace with the actual URL

  validateToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(this.tokenValidationUrl, { token });
  }
}