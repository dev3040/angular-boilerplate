import { Injectable, NgZone } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  ResetPassword,
  ForgotPassword,
  Login,
  Register,
  Email,
  GetUser,
  GetComments,
  UpdateUser,
} from './auth.action';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { state } from '@angular/animations';
import { DataService } from 'src/app/services/data.service';
export class AuthStateModel {
  loading?: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loading: false,
  },
})
@Injectable()
export class AuthState {
  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone,
    private messageService: MessageService,
    private dataService: DataService
  ) {}

  @Selector()
  static getLoading(state: any): any {
    return state.loading;
  }

  @Selector()
  static getEmail(state: any): any {
    return state.userEmail;
  }

  @Selector()
  static getUser(state: any): any {
    return state.user;
  }

  @Action(Login)
  login(ctx: StateContext<any>, { form }: Login): void {
    if (!form) {
      return;
    }

    ctx.patchState({ loading: true });

    this.authService
      .login(form)
      .pipe(take(1))
      .subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          ctx.dispatch(new GetUser());
          this.zone.run(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Authentication',
              detail: 'Successfully Logged In',
            });
            this.router.navigateByUrl('/home');
          });
          ctx.patchState({ loading: false });
        },
        (err) => {
          this.zone.run(() => {
            this.messageService.add({
              severity: 'error',
              summary: 'Authentication',
              detail: err.error.error,
            });
          });
        }
      );
  }

  @Action(Register)
  register(ctx: StateContext<any>, { form }: Register): void {
    if (!form) {
      return;
    }

    ctx.patchState({ loading: true });

    this.authService
      .register(form)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.zone.run(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Authentication',
              detail: 'Successfully Registered User',
            });
            this.router.navigateByUrl('/login');
          });
          ctx.patchState({ loading: false });
        },
        (err) => {
          this.zone.run(() => {
            this.messageService.add({
              severity: 'error',
              summary: 'Authentication',
              detail: err.error.error,
            });
          });
        }
      );
  }

  @Action(ForgotPassword)
  forgotPassword(ctx: StateContext<any>, { email }: ForgotPassword): void {
    if (!email) {
      return;
    }

    ctx.patchState({ loading: true });

    let stateValue = email;

    this.authService
      .forgotPassword(email)
      .pipe(take(1))
      .subscribe((res) => {
        this.zone.run(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Password Reset',
            detail: 'Password reset is send to the email',
          });
          this.router.navigateByUrl('/resetPassword');
        });
        ctx.setState({
          ...state,
          userEmail: stateValue,
        });
      });
  }
  @Action(ResetPassword)
  resetPassword(ctx: StateContext<any>, { form }: ResetPassword): void {
    if (!form) {
      return;
    }
    ctx.patchState({ loading: true });
    this.authService
      .resetPassword(form)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.zone.run(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Password Reset',
              detail: 'Password reset Successfully',
            });
            this.router.navigateByUrl('/login');
          });
        },
        (err) => {
          this.zone.run(() => {
            this.messageService.add({
              severity: 'error',
              summary: 'Password Reset',
              detail: err.message,
            });
            this.router.navigateByUrl('/login');
          });
        }
      );
  }
  @Action(GetUser)
  getUser(ctx: StateContext<any>) {
    this.authService
      .getUser()
      .pipe(take(1))
      .subscribe((res) => {
        ctx.setState({
          ...state,
          user: res,
        });
      });
  }
  @Action(UpdateUser)
  updateUser(ctx: StateContext<any>, { form }: UpdateUser): void {
    if (!form) {
      return;
    }
    ctx.patchState({ loading: true });
    this.authService.updateUser(form)
    .pipe(take(1))
    .subscribe(res=>{
      this.zone.run(() => {
        ctx.patchState({ loading: false });
        ctx.dispatch(new GetUser)
        this.messageService.add({
          severity: 'success',
          summary: 'Edit Profile',
          detail: res.message,
        });
      });
    },error=>{
      this.zone.run(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Edit Profile  ',
          detail: error.message,
        });
      });
      ctx.patchState({ loading: false });
     
    })
  }
}
