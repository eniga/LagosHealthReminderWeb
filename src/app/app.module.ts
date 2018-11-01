import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatTooltipModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    FooterComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
