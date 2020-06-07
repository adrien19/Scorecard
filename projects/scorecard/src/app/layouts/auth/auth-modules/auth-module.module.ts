import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from '../auth-login/auth-login.component';
import { SharedModule } from '../../../shared/shared-modules/shared.module';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [AuthLoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  exports: [AuthLoginComponent]
})
export class AuthModule { }
