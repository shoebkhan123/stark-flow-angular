import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* Base url for auth */
  BASE_URL: string =  'http://localhost:3000/auth/';

  constructor(private http: HttpClient) { }

  /* Login by email and password */
  login(email: string, password: string) {
    return this.http.post<any>(`${this.BASE_URL}login`, {
      email,
      password
    });
  }

  /* Signin user */
  signin(name: string, age: number, email: string, password: string) {
    return this.http.post<any>(`${this.BASE_URL}signin`, {
      name,
      age,
      email,
      password
    })
  }

  /* check for user is logged in */
  isLogin(): boolean {
    return  !!localStorage.getItem('token')
  }

  /* Logout the user */
  logout() {
    return localStorage.clear();
  }

  /* Get token from local storage */
  getToken(): string {
    return  localStorage.getItem('token')
  }

}
