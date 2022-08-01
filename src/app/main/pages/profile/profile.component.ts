import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdateUser } from 'src/app/store/auth/auth.action';
import { AuthState } from 'src/app/store/auth/auth.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private store:Store) {}
  user$:Observable<any>=this.store.select(AuthState.getUser)
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9 ]{10}'),
    ]),
  });
  ngOnInit(): void {
    this.user$.subscribe(res=>{
      this.form.patchValue({
        firstName:res?.firstName,
        lastName:res?.lastName,
        phoneNumber:res?.phoneNumber
      })
    })
  }
  onReset() {
    this.store.dispatch(new UpdateUser(this.form.getRawValue()))
  }
}
