import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrManagementRoutingModule } from './qr-management-routing.module';
import { QrManagementComponent } from './qr-management.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatSortModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatTooltipModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    QrManagementRoutingModule,
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
    QrManagementComponent
  ]
})
export class QrManagementModule { }
