import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Selector, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Email, ResetPassword } from 'src/app/store/auth/auth.action';
import { AuthState } from 'src/app/store/auth/auth.state';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  

  constructor(private store: Store) { }
  email$ = this.store.select(AuthState.getEmail)
  email:any
  form: FormGroup = new FormGroup({
    token: new FormControl('', [Validators.required]),
    // email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  ngOnInit(): void {
    this.email$.subscribe(res=>{ 
      this.email=res
    })
  }

  sendForm() {
    let data = this.form.getRawValue()
    data.email=this.email
    this.store.dispatch(new ResetPassword(data))
  }
}
