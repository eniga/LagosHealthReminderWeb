import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnprintedRoutingModule } from './unprinted-routing.module';
import { UnprintedComponent } from './unprinted.component';

@NgModule({
  imports: [
    CommonModule,
    UnprintedRoutingModule
  ],
  declarations: [UnprintedComponent]
})
export class UnprintedModule { }
