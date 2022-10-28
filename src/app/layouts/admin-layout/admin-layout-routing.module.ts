import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from 'src/app/pages/cars/cars.component';
import { CategoriesComponent } from 'src/app/pages/categories/categories.component';
import { UsersComponent } from 'src/app/pages/users/users.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent, },
  { path: 'categories', component: CategoriesComponent, },
{ path: 'cars', component: CarsComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
