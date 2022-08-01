import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private router:Router,private forgotService:AuthService,private messageService:MessageService) { }
  form:FormGroup=new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email])
  })          

  ngOnInit(): void {
  }
onforgotEmail(){
this.forgotService.forgotPasswordEmail(this.form.value).subscribe(res=>{
  console.log(res)
  if(res.success==1){
  this.router.navigate(['/otpVerify'])  
  this.messageService.add({severity:'success', summary: 'Success', detail: `${res.message}`});
  }
},(err=>{
  this.form.reset()
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].setErrors(null);
      });
  this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message});
}))
}

}
