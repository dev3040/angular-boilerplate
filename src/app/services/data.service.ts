import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  Base_Url = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) {}

  getComment() {
    return this.http.get(`${this.Base_Url}`);
  }
}
