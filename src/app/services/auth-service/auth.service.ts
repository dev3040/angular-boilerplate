import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  // login api
  login(data: any): Observable<any> {
    return this.http.post(`${env.baseUrl}/login`, data)
  }
  
  loginUuser(token: any) {
    localStorage.setItem("token", token);
    return true;
  }
  
  isLoggedIn(): Observable<any> {
    let token = localStorage.getItem('token')
    return this.http.post(`${env.baseUrl}/verifyUser`, { token: token })
  }
  isLoggedInterceptor(){
    let token=localStorage.getItem('token')
    if(token==undefined||token===""||token==null){
      return false;
    }else{
      return true;
    }
  }
  
  logout() {
    localStorage.removeItem('token');
    return true;
  }
  getToken() {
    return localStorage.getItem('token')
  }

  // register api
  register(data:any):Observable<any>{
    return this.http.post(`${env.baseUrl}/signup`,data)
  }

  // forgot password email api
  forgotPasswordEmail(data:any):Observable<any>{
    return this.http.post(`${env.baseUrl}/checkMail`,data)
  }
 
  // forgot otp verify
  forgotOtpVerify(data:any):Observable<any>{
    return this.http.post(`${env.baseUrl}/forgotPassword`,data)
  }

  // change password api
  changePassword(data:any):Observable<any>{
      return this.http.put(`${env.baseUrl}/changePassword`,data)
    }

  // Change profile
  changeProfile(data:any):Observable<any>{
    return this.http.put(`${env.baseUrl}/editUser`,data)
  }
}

