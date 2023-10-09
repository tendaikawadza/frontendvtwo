import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, observable } from 'rxjs';

import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { Key } from '../enum/key.enum';




@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public host = environment.apiUrl;
  private token: string | any;
  jwtHelper: any;
  loggedInUsername: any;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
  //  this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
   // this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/user/login`, user, { observe: 'response' });
  }

  public register(user: User): Observable<any> {
    return this.http.post<any>(`${this.host}/user/register`, user);
  }
  public logOut(): void {
    this.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem(Key.TOKEN);
    localStorage.removeItem('users');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem(Key.TOKEN, token);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User [] {
    if (localStorage.getItem('user')){
      return JSON.parse(JSON.stringify(localStorage.getItem('user')) || '')


    }
    
    return []
    
    ;
  }

  public loadToken(): void {
    this.token = localStorage.getItem('Token');
  }

  public getToken(): string {
    return this.token;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== ''){
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      
    }
    return false;
  }
}
