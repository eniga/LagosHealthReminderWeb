import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WardsManagementComponent } from './wards-management.component';

const routes: Routes = [
  {
    path: '', component: WardsManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WardsManagementRoutingModule { }
