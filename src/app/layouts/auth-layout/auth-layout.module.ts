import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class AuthLayoutModule { }
