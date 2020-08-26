import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { MatrialModule } from '../../material/matrial/matrial.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ AuthComponent, LoginComponent, SigninComponent ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatrialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
