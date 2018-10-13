import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      { path: 'dashboard', loadChildren: './../dashboard/dashboard.module#DashboardModule' },
      {path: 'patients', loadChildren: './../patients/patients.module#PatientsModule' },
      { path: 'medical-centres', loadChildren: './../medical-centres/medical-centres.module#MedicalCentresModule' },
      { path: 'medical-services', loadChildren: './../medical-services/medical-services.module#MedicalServicesModule' },
      { path: 'qr-management', loadChildren: './../qr-management/qr-management.module#QrManagementModule'},
      { path: 'user-management', loadChildren: './../user-management/user-management.module#UserManagementModule' },
      { path: 'wards', loadChildren: '../wards-management/wards-management.module#WardsManagementModule' },
      { path: 'lgas', loadChildren: '../lgas-management/lgas-management.module#LgasManagementModule' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
