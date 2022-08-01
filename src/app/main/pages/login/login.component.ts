import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Login } from 'src/app/store/auth/auth.action';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // 
  constructor(private store:Store) { }
  
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), 
    password:new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])  //Minimum eight characters, at least one letter and one number:

  });
  ngOnInit(): void {
  }
  sendForm(){
    let formData=this.form.getRawValue()
    this.store.dispatch(new Login(formData))
  }
}
