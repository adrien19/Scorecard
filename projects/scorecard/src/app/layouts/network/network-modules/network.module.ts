import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared-modules/shared.module';
import { NetworkComponent } from '../network.component';
import { NetworkRoutingModule } from '../network-modules/network-routing.module';
import { ScorecardListComponent } from '../scorecard-list/scorecard-list.component';
import { ScorecardItemComponent } from '../scorecard-list/scorecard-item/scorecard-item.component';
import { ScorecardDetailsComponent } from '../scorecard-details/scorecard-details.component';



@NgModule({
  declarations: [
    NetworkComponent,
    ScorecardListComponent,
    ScorecardItemComponent,
    ScorecardDetailsComponent
  ],

  imports: [
    SharedModule,
    NetworkRoutingModule
  ],

  exports: [
    NetworkComponent,
    ScorecardListComponent,
    ScorecardItemComponent,
    ScorecardDetailsComponent
  ]
})
export class NetworkModule { }
