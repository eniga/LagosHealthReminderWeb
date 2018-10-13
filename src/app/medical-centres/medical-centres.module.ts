import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalCentresRoutingModule } from './medical-centres-routing.module';
import { MedicalCentresComponent } from './medical-centres.component';
import { WardsManagementComponent } from '../wards-management/wards-management.component';
import { LgasManagementComponent } from '../lgas-management/lgas-management.component';
import { MatTooltipModule, MatInputModule, MatSortModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MedicalCentresRoutingModule,
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
    MedicalCentresComponent
  ]
})
export class MedicalCentresModule { }
