import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlSerializer, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {

  constructor(
    private router: Router,
    private userSvc: UserService
) { }
canActivate(route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
   
    const roles:any=localStorage.getItem('roles');
    console.log(roles)
    console.log(this.userSvc.isAuthenticated());
    if (!this.userSvc.isAuthenticated() && roles !== '') {
      // this.toastr.info('Please Log In!');
      this.router.navigate(['/login']);
       return false;
     }
    //console.log(roles);
    // logged in, so return true
   // this.authService.isLoggedIn();
   //this.router.navigate(['/user/management']);
return true;

  }
 
 

 // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     
  }
