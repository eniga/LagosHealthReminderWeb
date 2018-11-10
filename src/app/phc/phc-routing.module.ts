import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhcComponent } from './phc.component';

const routes: Routes = [
  {path: '', component: PhcComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhcRoutingModule { }
