import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/users', title: 'Users', icon: '', class: '' },
  { path: '/categories', title: 'Categories', icon: '', class: '' },
  { path: '/cars', title: 'Cars', icon: '', class: '' },
];


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

 
  public listTitles: any[] = [];
  public isCollapsed: boolean = true;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
  }

}
