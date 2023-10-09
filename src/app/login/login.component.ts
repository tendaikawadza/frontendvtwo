import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { LoginState } from 'src/app/interface/appstates';
import { UserService } from 'src/app/service/user.service';
import { DataState } from 'src/app/enum/datastate.enum';
import { Key } from 'src/app/enum/key.enum';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginState$: Observable<LoginState> = of({ dataState: DataState.LOADED });
  private phoneSubject = new BehaviorSubject<any | null>(null);
  private emailSubject = new BehaviorSubject<any | null>(null);
  readonly DataState = DataState;

  constructor(private router: Router, private userService: UserService,private authenticationService: AuthenticationService) { }
  

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('Dashboard');
    } else {
      this.router.navigateByUrl("login");
    }
  }
  login(loginForm: NgForm): void {
    this.loginState$ = this.userService.login$(loginForm.value.email, loginForm.value.password)
      .pipe(
        map((response:any) => {
          if (response.data.user.usingMfa) {
            this.phoneSubject.next(response.data.user.phone);
            this.emailSubject.next(response.data.user.email);
            return {
              dataState: DataState.LOADED, isUsingMfa: true, loginSuccess: false,
              phone: response.data.user.phone.substring(response.data.user.phone.length - 4)
            };
          } else {          
            localStorage.setItem(Key.TOKEN, response.data.access_token);
            localStorage.setItem(Key.REFRESH_TOKEN, response.data.refresh_token);
            localStorage.setItem('user',JSON.stringify( response.data.user));
            localStorage.setItem('roles',JSON.stringify( response.data.user?.roleName));
           // this.router.navigate(['/']);
        this.router.navigateByUrl('user/management');
            return { dataState: DataState.LOADED, loginSuccess: true };
          }
        }),
        startWith({ dataState: DataState.LOADING, isUsingMfa: false }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, isUsingMfa: false, loginSuccess: false, error })
        })
      )
  }

  verifyCode(verifyCodeForm: NgForm): void {
    this.loginState$ = this.userService.verifyCode$(this.emailSubject.value, verifyCodeForm.value.code)
      .pipe(
        map((response:any) => {
          localStorage.setItem(Key.TOKEN, response.data.access_token);
          localStorage.setItem(Key.REFRESH_TOKEN, response.data.refresh_token);
          this.router.navigate(['/']);
          return { dataState: DataState.LOADED, loginSuccess: true };
        }),
        startWith({ dataState: DataState.LOADING, isUsingMfa: true, loginSuccess: false,
          phone: this.phoneSubject.value.substring(this.phoneSubject.value.length - 4) }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, isUsingMfa: true, loginSuccess: false, error,
            phone: this.phoneSubject.value.substring(this.phoneSubject.value.length - 4) })
        })
      )
  }

  loginPage(): void {
    this.loginState$ = of({ dataState: DataState.LOADED });
  }

 

  // onLogin(user: User): void {
  //   this.showLoading = true;
  //   console.log(user);
  //   this.subscriptions.push(
  //     this.authenticationService.login(user).subscribe({
  //       next: (Response: HttpResponse<User> | any) => {
  //         console.log(JSON.stringify(Response))
  //         const token = Response.headers.get(HeaderType.JWT_TOKEN);
  //         this.authenticationService.saveToken(token);
  //         this.authenticationService.addUserToLocalCache(Response.body);
  //         this.router.navigateByUrl('user/management');
  //         this.showLoading = false;
  //       },
  //       error: (errorREponse: HttpErrorResponse) => {
  //         console.log(errorREponse);
          
  //         this.showLoading = false;
  //       }
  //     })
  //   );
  // }
  // ngOnDestroy(): void {
  //   this.subscriptions.forEach(sub => sub.unsubscribe());
  // }

}



