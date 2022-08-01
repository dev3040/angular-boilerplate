import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth.service';
import { AuthguardGuard } from './guards/authguard.guard';
import { MaterialModule } from './material.module';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ForgotPasswordComponent } from './pages/forgot_password/forgot-password.component';
import { ForgotOtpVerifyComponent } from './pages/forgot_password/forgot-otp-verify.component';
import { ChangePasswordComponent } from './pages/change_password/change-password.component';

@NgModule({
  declarations: [
   MainComponent,
   RegisterComponent,
   ProfileComponent,
   HomeComponent,
   LoginComponent,
   ForgotPasswordComponent,
   ForgotOtpVerifyComponent,
   ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastModule
  ],
  providers:[AuthguardGuard,
  MessageService]
})
export class MainModule { }
