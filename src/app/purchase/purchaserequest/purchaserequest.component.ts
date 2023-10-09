import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, map, startWith, catchError, of } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { CustomHttpResponse, Page } from 'src/app/interface/appstates';
import { Invoice } from 'src/app/interface/invoice';
import { State } from 'src/app/interface/state';
import { User } from 'src/app/interface/user';
import { CustomerService } from 'src/app/service/customer.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-purchaserequest',
  templateUrl: './purchaserequest.component.html',
  styleUrls: ['./purchaserequest.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurchaserequestComponent  implements OnInit {
  invoicesState$: Observable<State<CustomHttpResponse<Page<Invoice> & User>>>;
  private dataSubject = new BehaviorSubject<any>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  private showLogsSubject = new BehaviorSubject<boolean>(false);;
  showLogs$ = this.showLogsSubject.asObservable();
  readonly DataState = DataState;
  users:any=[];
  constructor(private router: Router, private customerService: CustomerService, private notification: NotificationService) { }

  ngOnInit(): void {
  
    this.customerService.invoices$().subscribe(user=>{

this.users=user;
console.log(this.users);
    });
    // this.invoicesState$ = this.customerService.invoices$()
    //   .pipe(
    //     map(response => {
    //     //  this.notification.onDefault(response.message);
    //       console.log(response);
    //       this.dataSubject.next(response);
    //       return { dataState: DataState.LOADED, appData: response };
    //     }),
    //     startWith({ dataState: DataState.LOADING }),
    //     catchError((error: string) => {
    //      // this.notification.onError(error);
    //       return of({ dataState: DataState.ERROR, error })
    //     })
    //   )
  }
  editPurchase(i:any){}
  deleteUser(i:any){}
  goToPage(pageNumber?: number): void {
    this.invoicesState$ = this.customerService.invoices$(pageNumber)
      .pipe(
        map(response => {
         // this.notification.onDefault(response.message);
          console.log(response);
          this.dataSubject.next(response);
        //  this.currentPageSubject.next(pageNumber);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
        //  this.notification.onError(error);
          return of({ dataState: DataState.LOADED, error, appData: this.dataSubject.value })
        })
      )
  }

  goToNextOrPreviousPage(direction?: string): void {
    this.goToPage(direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

}
