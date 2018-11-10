import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhcRoutingModule } from './phc-routing.module';
import { PhcComponent } from './phc.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatSortModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatTooltipModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PhcRoutingModule,
    FormsModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCardModule
  ],
  declarations: [PhcComponent]
})
export class PhcModule { }
