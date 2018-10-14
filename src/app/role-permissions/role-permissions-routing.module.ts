import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolePermissionsComponent } from './role-permissions.component';

const routes: Routes = [
  {
    path: '', component: RolePermissionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolePermissionsRoutingModule { }
