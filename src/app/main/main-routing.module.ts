import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './guards/authguard.guard';
import { MainComponent } from './main.component';
import { ChangePasswordComponent } from './pages/change_password/change-password.component';
import { ForgotOtpVerifyComponent } from './pages/forgot_password/forgot-otp-verify.component';
import { ForgotPasswordComponent } from './pages/forgot_password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
{
    path:'login',
    component:LoginComponent,
},
{
  path:'register',
  component:RegisterComponent
},{
  path:'forgotpassword',
  component:ForgotPasswordComponent
},
{
  path:'otpVerify',
  component:ForgotOtpVerifyComponent
},
  {
    path:'',
    component:MainComponent,
    canActivate:[AuthguardGuard],
    children: [
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'changepassword',
        component:ChangePasswordComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
