import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { RouterModule , Router } from '@angular/router';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router,private loginService:AuthService,private messageService:MessageService) { }

form:FormGroup=new FormGroup({
  email: new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])  //Minimum eight characters, at least one letter and one number:
})

  ngOnInit(): void {
  }

onLogin(){
  this.loginService.login(this.form.value).subscribe((res:any) => {
    console.log(res)
  if(res.success==1){
    this.loginService.loginUuser(res.result.token)
    this.router.navigate(['/home'])
    this.messageService.add({severity:'success', summary: 'Success', detail: `${res.message}`});
  }
  },err=>{
    this.form.reset()
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].setErrors(null);
      });
    this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message});
  })
}
}
