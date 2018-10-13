import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
  { path: '/patients', title: 'Patient Records', icon: 'files_single-copy-04', class: '' },
  { path: '/medical-centres', title: 'Settlement Management',  icon:'location_map-big', class: '' },
  { path: '/medical-services', title: 'Medical Services',  icon:'design_bullet-list-67', class: '' },
  { path: '/qr-management', title: 'QR Management', icon: 'education_paper', class: ''},
  { path: '/user-management', title: 'User Management',  icon:'users_single-02', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
