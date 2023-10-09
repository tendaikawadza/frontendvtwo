import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';

import { UserService } from 'src/app/service/user.service';
import { RegisterState } from '../interface/appstates';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  registerState$: Observable<RegisterState> = of({ dataState: DataState.LOADED });
  readonly DataState = DataState;

  constructor(private userService: UserService, private router:Router) { }

  register(registerForm: NgForm): void {
    this.registerState$ = this.userService.save$(registerForm.value)
      .pipe(
        map(response => {
          console.log(response);
          registerForm.reset();
          this.router.navigateByUrl("login");
          return { dataState: DataState.LOADED, registerSuccess: true, message: response.message };
        }),
        startWith({ dataState: DataState.LOADING, registerSuccess: false }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, registerSuccess: false, error })
        })
      );
  }

  createAccountForm(): void {
    this.registerState$ = of({ dataState: DataState.LOADED, registerSuccess: false });
  }

}
