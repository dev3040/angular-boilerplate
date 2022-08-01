import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngxs/store';
import { GetUser } from 'src/app/store/auth/auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSer:AuthService, private router: Router, private messageService: MessageService,private store:Store){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authSer.getUser().subscribe(res=>{
      this.store.dispatch(new GetUser)
      return true
    },error=>{
      this.router.navigate(['/login'])
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Please provide login credentials` });
      return false
    })
    return true;
  }
  
}
