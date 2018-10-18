import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceKindsRoutingModule } from './service-kinds-routing.module';
import { ServiceKindsComponent } from './service-kinds.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatSortModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatTooltipModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ServiceKindsRoutingModule,
    FormsModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCardModule
  ],
  declarations: [ServiceKindsComponent]
})
export class ServiceKindsModule { }
