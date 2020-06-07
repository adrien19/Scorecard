import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthLoginComponent } from '../auth-login/auth-login.component';


const routes: Routes = [
  {path: '', component: AuthLoginComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
