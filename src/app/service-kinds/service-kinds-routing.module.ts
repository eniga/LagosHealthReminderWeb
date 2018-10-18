import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceKindsComponent } from './service-kinds.component';

const routes: Routes = [
  {
    path: '', component: ServiceKindsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceKindsRoutingModule { }
