import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './guard/authentication.guard';
import { StockComponent } from './stock/stock/stock.component';
import { StockdashboardComponent } from './stockdashboard/stockdashboard.component';

import { StockrequestComponent } from './stockrequest/stockrequest.component';
import { PurchaseRequastAdminComponent } from './purchase-requast-admin/purchase-requast-admin.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifyComponent } from './user/verify/verify.component';
import { ProfileComponent } from './profile/profile.component';
import { HeadProcurementAuthorisationComponent } from './component/head-procurement-authorisation/head-procurement-authorisation.component';
import { NewHeadProcurementAuthorisationComponent } from './component/new-head-procurement-authorisation/new-head-procurement-authorisation.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'resetpassword', component: ResetpasswordComponent,canActivate: [AuthenticationGuard] },
  { path: 'user/verify/account/:key', component: VerifyComponent,canActivate: [AuthenticationGuard] },
  { path: 'user/verify/password/:key', component: VerifyComponent,canActivate: [AuthenticationGuard] },
  { path: 'profile/:uid', component: ProfileComponent, canActivate: [AuthenticationGuard] },
  { path: 'register', component: RegisterComponent },
  //{ path: 'purchase', component: PurchaseRequastAdminComponent },
  {path: 'stockrequest' ,component:StockrequestComponent, canActivate: [AuthenticationGuard]},
  { path: 'stock', component: StockComponent, canActivate: [AuthenticationGuard]},
  { path: 'user/management', component: UserComponent, canActivate: [AuthenticationGuard]}, 
  { path: 'Dashboard', component:StockdashboardComponent,canActivate: [AuthenticationGuard]}, 
  { path: 'HeadProcurementAuthorisation', component:HeadProcurementAuthorisationComponent,canActivate: [AuthenticationGuard]}, 
  
  { path: 'HeadProcurementAuthorisation/new', component:NewHeadProcurementAuthorisationComponent,canActivate: [AuthenticationGuard]}, 

  

  
  {
    path: 'purchase',
    loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
  },
  {path: 'stock/:id', component:StockComponent, pathMatch: 'full'}, 
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


  
}
