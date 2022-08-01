import { Injectable, NgZone } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private authSer: AuthService,
    private toast: MessageService,
    private router: Router,
    private zone: NgZone
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token');
    
    if (token) {
      let tokenreq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });      
      return next.handle(tokenreq)
    }
    return next.handle(request);
  }
}
