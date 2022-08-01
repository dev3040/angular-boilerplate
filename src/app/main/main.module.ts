import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AuthState } from '../store/auth/auth.state';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { MaterialModule } from './material.module';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { DataState } from '../store/DataTable/dt.state';
@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastModule,
    NgxsModule.forRoot([AuthState,DataState],{
      developmentMode: !environment.production,
    })
    
  ],
  providers:[MessageService]
})
export class MainModule { }
