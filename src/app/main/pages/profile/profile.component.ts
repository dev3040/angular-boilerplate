import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 userdata:any=""
  constructor(private profile_service:AuthService,private messageService:MessageService,private router:Router) { }
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone_no: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")])
  })
  ngOnInit(): void {
    this.profile_service.isLoggedIn().subscribe((res=>{
      this.userdata=res.result
      this.form.patchValue({
        name: this.userdata.name,
        phone_no: this.userdata.phone_no
      });
    }))
  }
  onReset(){
    this.profile_service.changeProfile(this.form.value).subscribe((res=>{
      if(res.success==1){
        this.messageService.add({severity:'success', summary: 'Success', detail: `${res.message}`});
      }
      }),err=>{
        this.form.reset()
          Object.keys(this.form.controls).forEach(key => {
            this.form.controls[key].setErrors(null);
          });
        this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message});
      })
}
}
