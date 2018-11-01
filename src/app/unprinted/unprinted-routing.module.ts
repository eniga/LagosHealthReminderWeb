import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnprintedComponent } from './unprinted.component';

const routes: Routes = [
  {
    path: '', component: UnprintedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnprintedRoutingModule { }
