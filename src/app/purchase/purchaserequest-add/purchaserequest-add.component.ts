import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Observable, BehaviorSubject, map, startWith, catchError, of } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { CustomHttpResponse, Page } from 'src/app/interface/appstates';
import { Customer } from 'src/app/interface/customer';
import { State } from 'src/app/interface/state';
import { User } from 'src/app/interface/user';
import { CustomerService } from 'src/app/service/customer.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-purchaserequest-add',
  templateUrl: './purchaserequest-add.component.html',
  styleUrls: ['./purchaserequest-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurchaserequestAddComponent implements OnInit {
  newInvoiceState$: Observable<State<CustomHttpResponse<Customer[] & User>>>;
  private dataSubject = new BehaviorSubject<any>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = DataState;
  newInvoicefrm:FormGroup;
  signatureImg: string;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 700,
    'canvasHeight': 300
  };
  constructor(private customerService: CustomerService, private notification: NotificationService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.newInvoicefrm = this.fb.group({
      
    })
    this.newInvoiceState$ = this.customerService.newInvoice$()
      .pipe(
        map(response => {
       //   this.notification.onDefault(response.message);
          console.log(response);
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADING }),
        catchError((error: string) => {
       //   this.notification.onError(error);
          return of({ dataState: DataState.ERROR, error })
        })
      )
  }
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 2); 
    this.signaturePad.clear(); 
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  savePad() {
    
  }

  newInvoice(): void {
    this.dataSubject.next({ ...this.dataSubject.value, message: null });
    this.isLoadingSubject.next(true);
    console.log(this.signatureImg);
    // this.newInvoiceState$ = this.customerService.createInvoice$(newInvoiceForm.value.customerId, newInvoiceForm.value)
    //   .pipe(
    //     map(response => {
    //      // this.notification.onDefault(response.message);
    //       console.log(response);
    //       newInvoiceForm.reset({ status: 'PENDING' });
    //       this.isLoadingSubject.next(false);
    //       this.dataSubject.next(response);
    //       return { dataState: DataState.LOADED, appData: this.dataSubject.value };
    //     }),
    //     startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
    //     catchError((error: string) => {
    //     //  this.notification.onError(error);
    //       this.isLoadingSubject.next(false);
    //       return of({ dataState: DataState.LOADED, error })
    //     })
    //   )
  }

}
