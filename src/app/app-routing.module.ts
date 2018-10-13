import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Application Components
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthGuard } from './auth';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '', loadChildren: './admin-layout/admin-layout.module#AdminLayoutModule', canActivate: [AuthGuard]
  },
  {
    path: 'login', loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'forgot', loadChildren: './forgot/forgot.module#ForgotModule'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
