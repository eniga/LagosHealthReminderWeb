import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatTooltipModule, MatCardModule } from '@angular/material';

import { LgasManagementRoutingModule } from './lgas-management-routing.module';
import { LgasManagementComponent } from './lgas-management.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LgasManagementRoutingModule,
    FormsModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCardModule
  ],
  declarations: [
    LgasManagementComponent
  ]
})
export class LgasManagementModule { }
