import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetUser } from '../store/auth/auth.action';
import { AuthState } from '../store/auth/auth.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
 opened!: boolean;
 mode = new FormControl('push');
 login:boolean=true;
 user$ = this.store.select(AuthState.getUser)
 userProf:any={}
  constructor(private router:Router,private store:Store) { }
  
  ngOnInit(): void {
    this.user$.subscribe(res=>{
      this.userProf=res      
    })
  }
  logout(){
    localStorage.clear();
    this.router.navigate(["/login"])
  }
}
