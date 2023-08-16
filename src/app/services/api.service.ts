import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/model';
import { Category } from '../models/category';
import { Quiz } from '../models/quiz';
import { Question } from '../models/questions';

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
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if the token is fetched correctly
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const userEmail = localStorage.getItem('email');
    
    const url = `${this.baseUrl}find/${userEmail}`; // Add a slash after this.baseUrl
    return this.http.get<User>(url, { headers });
  }
  

  updateUser(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if the token is fetched correctly

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'); // Set content type to JSON

    // Send the PUT request with the provided data and headers
    return this.http.put(this.baseUrl + 'update', data, { headers });
  }

  getAllCategory(): Observable<Category[]> {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if the token is fetched correctly
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Category[]>(
      'http://localhost:8080/api/exam-portal/category/all',{ headers }
    );
  }

  addCategory(category:Category): Observable<any>{
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if the token is fetched correctly
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(
      'http://localhost:8080/api/exam-portal/category/add',category,{ headers }
    );
  }

  getAllQuiz(): Observable<Quiz[]> {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if the token is fetched correctly
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Quiz[]>(
      'http://localhost:8080/api/exam-portal/quiz/all',{ headers }
    );
  }

  getQuizByCategoryId(categoryId:number): Observable<Quiz[]> {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if the token is fetched correctly
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Quiz[]>(
      `http://localhost:8080/api/exam-portal/quiz/category/${categoryId}`,{ headers }
    );
  }
  
  addQuiz(quiz:Quiz): Observable<any>{
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if the token is fetched correctly
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(
      'http://localhost:8080/api/exam-portal/quiz/add',quiz,{ headers }
    );
  }

  getSingleQuestion(quizId:number): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if the token is fetched correctly
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `http://localhost:8080/api/exam-portal/quiz/${quizId}`; // Add a slash after this.baseUrl
    return this.http.get(url, { headers });
  }


  getAllQuestion(quizId:number): Observable<Question[]> {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if the token is fetched correctly
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `http://localhost:8080/api/exam-portal/question/quiz/${quizId}`; 
    return this.http.get<Question[]>(url, { headers });
  }
  

  addQuestion(question:Question): Observable<any>{
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if the token is fetched correctly
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(
      'http://localhost:8080/api/exam-portal/question/add',question,{ headers }
    );
  }
}
