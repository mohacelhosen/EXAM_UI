import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  TotalCorrectAnswer=0;

  constructor( private http: HttpClient) {}

  private tokenValidationUrl = 'http://localhost:8080/api/exam-portal/auth/token'; // Replace with the actual URL

  validateToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(this.tokenValidationUrl, { token });
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const userRole = tokenPayload.roles; // Assuming the role information is stored in "roles"
        return userRole;
      } catch (error) {
        console.error('Error parsing token payload:', error);
        return null;
      }
    }

    return null; // Token not found
  }

  getUserName(){
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const appUserName = tokenPayload.userName; // Assuming the role information is stored in "userName"
        return appUserName;
      } catch (error) {
        console.error('Error parsing token payload:', error);
        return "USER";
      }
    }

    return "USER"; // USER not found
  }

  getUserPhoto(){
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            console.log('Token Payload:', tokenPayload);
            const appUserPhoto = tokenPayload.userPhoto;
            console.log('User Photo:', appUserPhoto);
            return appUserPhoto;
        } catch (error) {
            console.error('Error parsing user photo payload:', error);
            return null;
        }
    }

    return null; // USER Photo not found
}


  
}