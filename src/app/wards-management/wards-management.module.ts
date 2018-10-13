import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WardsManagementRoutingModule } from './wards-management-routing.module';
import { WardsManagementComponent } from './wards-management.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatSortModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatTooltipModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    WardsManagementRoutingModule,
    FormsModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCardModule
  ],
  declarations: [WardsManagementComponent]
})
export class WardsManagementModule { }
