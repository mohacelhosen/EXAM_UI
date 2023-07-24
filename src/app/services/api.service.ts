import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    apiUrl:string="http://localhost:8080/api/user/signup";
    constructor(private http:HttpClient) { }
  
    userRegistration(data:any){
      return this.http.post(this.apiUrl,data);
    }
  
  }