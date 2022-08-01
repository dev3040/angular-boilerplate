import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ForgotPassword } from 'src/app/store/auth/auth.action';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private store:Store) { }
  
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), 
    });
  ngOnInit(): void {
  }
  sendForm(){
    let formData=this.form.getRawValue()
    this.store.dispatch(new ForgotPassword(formData.email))
  }
}
