import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetComments } from 'src/app/store/DataTable/dt.action';
import { DataState } from 'src/app/store/DataTable/dt.state';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(private store:Store) { }
  comments$:Observable<any>=this.store.select(DataState.getComments)
  loading$:Observable<any>=this.store.select(DataState.getLoading)
  loading:boolean=false
  cars: any[]=[
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  ];
  ngOnInit(): void {   
    this.store.dispatch(new GetComments())
    this.loading$.subscribe((res:any)=>{
     this.loading=res
    })
  }
  
}
