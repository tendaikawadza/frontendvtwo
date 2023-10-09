import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";

import { User } from "../model/user";


import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { CustomHttpResponse, Profile } from '../interface/appstates';




import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Stock } from "../model/stock";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Key } from '../enum/key.enum';
const baseUrl = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jwtHelper = new JwtHelperService();
  private server = environment.apiUrl;
  private stockURL = environment.stockUrl;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  accessToken: any;
  constructor(private http: HttpClient) {
    const tokenn: any = localStorage.getItem(Key.REFRESH_TOKEN);
    this.currentUserSubject = new BehaviorSubject<User>(tokenn);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getStock(): Observable<Stock[] | HttpErrorResponse> {

    return this.http.get<Stock[]>('${this.host}/stock/list');

  }

  public fetchNotifications(user: any) {
    return this.http.post<any>(this.stockURL + '/stock/browseNotifications/' + user.receiverId, user);
  }
  createUserFormDate(data: any, test: any, tsts: any) {

  }
  public addUser(formData: any): Observable<Stock | HttpErrorResponse> {
    return this.http.post<Stock>('${this.host}/user/add', formData);

  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>(baseUrl + '/list');
  }


  login$ = (email: string, password: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.post<CustomHttpResponse<Profile>>
      (`${this.server}/user/login`, { email, password })
      .pipe(
        tap((response: any) => {
          this.accessToken = response.data.access_token;   
        
this.setAccessToken(response.data.access_token);

        }),
        catchError(this.handleError)
      );

  verifyCode$ = (email: any, code: any) => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
      (`${this.server}/user/verify/code/${email}/${code}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  setAccessToken(token: any) {
    this.accessToken = token;
  }
  getAccessToken() {
    return this.accessToken;
  }

  save$ = (user: User) => <Observable<CustomHttpResponse<Profile>>>
    this.http.post<CustomHttpResponse<Profile>>
      (`${this.server}/user/register`, user)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  requestPasswordReset$ = (email: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
      (`${this.server}/user/resetpassword/${email}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

      singleProfile$ = (id:any) => <Observable<CustomHttpResponse<Profile>>>
      this.http.get<CustomHttpResponse<Profile>>
        (`${this.server}/user/users/${id}`)
        .pipe(
          tap(console.log),
          catchError(this.handleError)
        );
 
  profile$ = () => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
      (`${this.server}/user/profile`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  update$ = (user: User) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
      (`${this.server}/user/update`, user)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
      delete$(user:any){
        let url=`${this.server}/user/delete/${user.id}`;    
        return this.http.delete<any>(url);        
       }
      
  // delete$ = (user: any) => <Observable<any>
  //   this.http.delete<any>(`${this.server}/user/delete/${user.id}`)
  //   .pipe(
  //     tap(console.log),
  //     catchError(this.handleError)
  //   );

  refreshToken$ = () => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
      (`${this.server}/user/refresh/token`, { headers: { Authorization: `Bearer ${localStorage.getItem(Key.REFRESH_TOKEN)}` } })
      .pipe(
        tap((response: any) => {
          console.log(response);
          localStorage.removeItem(Key.TOKEN);
          localStorage.removeItem(Key.REFRESH_TOKEN);
          localStorage.setItem(Key.TOKEN, response.data.access_token);
          localStorage.setItem(Key.REFRESH_TOKEN, response.data.refresh_token);
        }),
        catchError(this.handleError)
      );

  updatePassword$ = (form: { currentPassword: string, newPassword: string, confirmNewPassword: string }) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
      (`${this.server}/user/update/password`, form)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  updateRoles$ = (roleName: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
      (`${this.server}/user/update/role/${roleName}`, {})
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  updateAccountSettings$ = (settings: { enabled: boolean, notLocked: boolean }) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
      (`${this.server}/user/update/settings`, settings)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  toggleMfa$ = () => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
      (`${this.server}/user/togglemfa`, {})
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  updateImage$ = (formData: FormData) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
      (`${this.server}/user/update/image`, formData)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );


  logOut() {
    localStorage.removeItem(Key.TOKEN);
    localStorage.removeItem(Key.REFRESH_TOKEN);
  }

  isAuthenticated = (): boolean => (this.jwtHelper.decodeToken<string> && !this.jwtHelper.isTokenExpired(localStorage.getItem(Key.TOKEN))) ? true : false;

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error occurred - ${error.error.message}`;
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason;
        console.log(errorMessage);
      } else {
        errorMessage = `An error occurred - Error status ${error.status}`;
      }
    }
    return throwError(() => errorMessage);
  }


}

