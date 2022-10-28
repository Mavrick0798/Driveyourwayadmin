import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: '',
    component: AdminLayoutComponent,
    // canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: () => import("./../app/layouts/admin-layout/admin-layout.module").then(e => e.AdminLayoutModule)
    }]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import("./../app/layouts/auth-layout/auth-layout.module").then(e => e.AuthLayoutModule)
    }]
  },
  // {
  //   path: '**',
  //   redirectTo: 'users'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
