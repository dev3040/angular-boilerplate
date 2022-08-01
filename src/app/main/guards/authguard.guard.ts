import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private loginService: AuthService, private router: Router, private messageService: MessageService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.loginService.isLoggedIn().subscribe((res: any) => {
      return true
    }, error => {
      this.router.navigate(['/login'])
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Please provide login credentials` });
      return false
    })
    return true
  }
}
