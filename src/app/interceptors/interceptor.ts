import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable()
export class InterceptorDInterceptor implements HttpInterceptor {
    constructor(private logSer: AuthService, private injector: Injector) { }
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let token = localStorage.getItem("token")

        if (this.logSer.isLoggedInterceptor() == true) {

            let tokenreq = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
            return next.handle(tokenreq);
        }
        return next.handle(request)
    }

}
