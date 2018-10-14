import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolePermissionsRoutingModule } from './role-permissions-routing.module';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatSortModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatTooltipModule, MatCardModule } from '@angular/material';
import { RolePermissionsComponent } from './role-permissions.component';

@NgModule({
  imports: [
    CommonModule,
    RolePermissionsRoutingModule,
    FormsModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCardModule
  ],
  declarations: [RolePermissionsComponent]
})
export class RolePermissionsModule { }
