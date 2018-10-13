import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LgasManagementComponent } from './lgas-management.component';

const routes: Routes = [
  {
    path: '', component: LgasManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LgasManagementRoutingModule { }
