import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NetworkComponent } from '../network.component';
import { ScorecardDetailsComponent } from '../scorecard-details/scorecard-details.component';
import { NetworkTemplateComponent } from '../network-template/network-template.component';
import { ScorecardCreateNewComponent } from '../scorecard-create-new/scorecard-create-new.component';

const routes: Routes = [
    {path: '', component: NetworkTemplateComponent,
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
