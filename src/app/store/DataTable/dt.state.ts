import { Injectable, NgZone } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { state } from '@angular/animations';
import { DataService } from 'src/app/services/data.service';
import { GetComments } from './dt.action';
export class GetData {
  loading?: boolean;
}

@State<GetData>({
  name: 'data',
  defaults: {
    loading: false,
  },
})
@Injectable()
export class DataState {
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
  static getComments(state:any):any{
    return state.comments
  }

  @Action(GetComments)
  getComments(ctx: StateContext<any>) {
    ctx.patchState({ loading: true });
    this.dataService
      .getComment()
      .pipe(take(1))
      .subscribe((res) => {
        ctx.patchState({
          comments:res,
          loading:false
        })
      },error=>{
        ctx.patchState({
          loading:false
        })
      });
  }
}
