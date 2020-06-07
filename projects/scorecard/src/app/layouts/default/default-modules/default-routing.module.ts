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
    // {path: 'network', loadChildren: () => import('../../network/network-modules/network.module').then( module => module.NetworkModule)}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DefaultRoutingModule {

}
