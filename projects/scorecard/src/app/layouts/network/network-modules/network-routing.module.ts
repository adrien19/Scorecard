import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NetworkComponent } from '../network.component';
import { NetworkTemplateComponent } from '../network-template/network-template.component';
import { ScorecardCreateNewComponent } from '../scorecard-create-new/scorecard-create-new.component';
import { AuthGuard } from '../../auth/auth-helpers/auth.guard';
import { Role } from '../../auth/auth-models/role';
import { ScorecardDetailsComponent } from '../../../shared/components/scorecard-collection/scorecard-details/scorecard-details.component';

const routes: Routes = [
    {
      path: '',
      component: NetworkTemplateComponent,
      canActivate: [AuthGuard],
      // data: { roles: [Role.Admin] },
      children:[
          {path: '', component: NetworkComponent},
          {path: 'new', component: ScorecardCreateNewComponent},
          {path: ':id/scorecard-details', component: ScorecardDetailsComponent},
      ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class NetworkRoutingModule {

}
