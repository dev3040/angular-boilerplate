import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth-service/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: AuthService, private router: Router, private messageService: MessageService) { }
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    phone_no: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")])
  })

  ngOnInit(): void {
  }

  sendForm() {
    this.registerService.register(this.form.value).subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        this.router.navigate(['/login'])
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${res.message}` });
      }
    }, err => {
      this.form.reset()
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].setErrors(null);
      });
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });

    })
  }
}
