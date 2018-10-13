import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicalServicesComponent } from './medical-services.component';

const routes: Routes = [
  {
    path: '', component: MedicalServicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalServicesRoutingModule { }
