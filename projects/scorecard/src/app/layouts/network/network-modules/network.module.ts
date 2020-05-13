import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared-modules/shared.module';
import { NetworkComponent } from '../network.component';
import { NetworkRoutingModule } from '../network-modules/network-routing.module';
import { ScorecardListComponent } from '../scorecard-list/scorecard-list.component';



@NgModule({
  declarations: [
    NetworkComponent,
    ScorecardListComponent
  ],

  imports: [
    SharedModule,
    NetworkRoutingModule
  ],

  exports: [
    NetworkComponent,
    ScorecardListComponent
  ]
})
export class NetworkModule { }
