import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Base_Url="http://localhost:4000"

  constructor(private http:HttpClient) { }

  login(form:any): Observable<any> {
    return this.http.post(`${this.Base_Url}/api/login`, {
      ...form,
    });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.Base_Url}/api/forgotPassword`, {
      email,
    });
  }

  resetPassword(form: any): Observable<any> {
    return this.http.post(`${this.Base_Url}/api/resetPassword`, {
      ...form,
    });
  }

  register(form: any): Observable<any> {
    return this.http.post(`${this.Base_Url}/api/register`,{
      ...form,
    });
  }
  getUser(): Observable<any>{
    return this.http.get(`${this.Base_Url}/api/getUser`)
  }

  updateUser(form:any): Observable<any>{
    return this.http.put(`${this.Base_Url}/api/updateUser`,form)
  }
}
