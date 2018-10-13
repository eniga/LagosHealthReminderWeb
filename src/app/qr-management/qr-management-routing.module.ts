import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrManagementComponent } from './qr-management.component';

const routes: Routes = [
  {
    path: '', component: QrManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrManagementRoutingModule { }
