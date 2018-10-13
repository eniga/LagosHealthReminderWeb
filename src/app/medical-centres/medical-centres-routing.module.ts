import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicalCentresComponent } from './medical-centres.component';

const routes: Routes = [
  {
    path: '', component: MedicalCentresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalCentresRoutingModule { }
