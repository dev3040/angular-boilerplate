import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth-service/auth.service';


@Component({
  selector: 'app-forgot-otp-verify',
  templateUrl: './forgot-otp-verify.component.html',
  styleUrls: ['./forgot-otp-verify.component.css']
})
export class ForgotOtpVerifyComponent implements OnInit {

  constructor(private router:Router,private forgotService:AuthService,private messageService:MessageService) { }
  form:FormGroup=new FormGroup({
    code: new FormControl('',[Validators.required]),
    changed_pass:new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])  //Minimum eight characters, at least one letter and one number:
  })
  ngOnInit(): void {
  }
  onOtpSubmit(){
    this.forgotService.forgotOtpVerify(this.form.value).subscribe(res=>{
      if(res.success==1){
        this.router.navigate(['/login'])  
        this.messageService.add({severity:'success', summary: 'Success', detail: `${res.message}`});
      }
      else if(res.success==0){
        this.messageService.add({severity:'error', summary: 'Error', detail: `${res.message}`});
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
