import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth-service/auth.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form:FormGroup=new FormGroup({
    old_pass:new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),  //Minimum eight characters, at least one letter and one number:
    new_pass:new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])  //Minimum eight characters, at least one letter and one number:
  })
  constructor(private changeService:AuthService,private messageService:MessageService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.changeService.changePassword(this.form.value).subscribe(res=>{
      if(res.success==1){
        localStorage.removeItem('token');
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
