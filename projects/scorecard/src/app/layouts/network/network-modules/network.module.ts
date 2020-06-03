import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared-modules/shared.module';
import { NetworkComponent } from '../network.component';
import { NetworkRoutingModule } from '../network-modules/network-routing.module';
import { ScorecardListComponent } from '../scorecard-list/scorecard-list.component';
import { ScorecardItemComponent } from '../scorecard-list/scorecard-item/scorecard-item.component';
import { ScorecardDetailsComponent } from '../scorecard-details/scorecard-details.component';
import { NetworkTemplateComponent } from '../network-template/network-template.component';
import { ScorecardCreateNewComponent } from '../scorecard-create-new/scorecard-create-new.component';




@NgModule({
  declarations: [
    NetworkComponent,
    ScorecardListComponent,
    ScorecardDetailsComponent,
    ScorecardItemComponent,
    NetworkTemplateComponent,
    ScorecardCreateNewComponent,
  ],

  imports: [
    RouterModule,
    SharedModule,
    NetworkRoutingModule
  ],

  exports: [
    NetworkComponent,
    ScorecardListComponent,
    ScorecardDetailsComponent,
    ScorecardItemComponent,
    NetworkTemplateComponent,
    ScorecardCreateNewComponent,
  ]
})
export class NetworkModule { }
