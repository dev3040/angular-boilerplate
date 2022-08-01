import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  mode = new FormControl('push');
  constructor(private loginService:AuthService,private router:Router,private _focusMonitor: FocusMonitor) { }
  ngAfterViewInit() {
    this._focusMonitor.stopMonitoring(<HTMLElement>document.getElementById('menu'));
    this._focusMonitor.stopMonitoring(<HTMLElement>document.getElementById('profile_circle'));
}
  ngOnInit(): void {
  }

onLogout(){
  let logout=this.loginService.logout()
  if(logout){
    this.router.navigate(['/login'])
  }
  }
}
