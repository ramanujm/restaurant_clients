import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSignupComponent } from './pages/user-signup/user-signup.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'login',
    pathMatch:"full"
  },
  {
    path:"signup",
    component: UserSignupComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'customer',
    loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
