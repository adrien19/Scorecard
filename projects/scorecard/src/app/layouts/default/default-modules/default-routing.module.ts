import { DefaultComponent } from '../default.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth-helpers/auth.guard';

const routes: Routes = [
    {
      path: '',
      component: DefaultComponent,
      canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DefaultRoutingModule {

}
