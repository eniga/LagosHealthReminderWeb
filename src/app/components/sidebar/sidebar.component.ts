import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  visible: boolean;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '', visible: true },
  { path: '/patients', title: 'Patient Records', icon: 'files_single-copy-04', class: '', visible: true },
  { path: '/medical-centres', title: 'Organization Management',  icon:'location_map-big', class: '', visible: true },
  { path: '/medical-services', title: 'Health Services',  icon:'design_bullet-list-67', class: '', visible: true },
  { path: '/qr-management', title: 'QR Management', icon: 'education_paper', class: '', visible: true},
  { path: '/user-management', title: 'User Management',  icon:'users_single-02', class: '', visible: true },
  { path: '/campaign', title: 'Campaign / Alert Management', icon:'ui-1_email-85', class: '', visible: true},
  { path: '/settings', title: 'Settings', icon:'loader_gear', class: '', visible: true},
  { path: '/reports', title: 'Reports', icon:'loader_gear', class: '', visible: true}
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
