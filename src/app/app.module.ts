import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './main/main.module';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InterceptorDInterceptor } from './interceptors/interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({ 
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [MessageService,{ provide: HTTP_INTERCEPTORS, useClass: InterceptorDInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
