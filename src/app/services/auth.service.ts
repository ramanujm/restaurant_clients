import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const base_url = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(signupRequest: any): Observable<any> {
    return this.http.post<[]>(base_url+'api/auth/signup', signupRequest);
  }

  login(loginRequest: any) : Observable<any> {
    return this.http.post<[]>(base_url+'api/auth/login', loginRequest);

  }
}
