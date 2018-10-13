import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalServicesRoutingModule } from './medical-services-routing.module';
import { MedicalServicesComponent } from './medical-services.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatSortModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatTooltipModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MedicalServicesRoutingModule,
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
    MedicalServicesComponent
  ]
})
export class MedicalServicesModule { }
