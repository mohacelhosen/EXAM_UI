import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { User } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    apiUrl:string="http://localhost:8080/api/user/signup";
    allApiUrl:string = "http://localhost:8080/api/user/users/all";


    constructor(private http:HttpClient) { }
  
    userRegistration(data:any){
      return this.http.post(this.apiUrl,data);
    }

    getAllData():Observable<User[]>{
      return this.http.get<User[]>(this.allApiUrl);
    }
  
  }