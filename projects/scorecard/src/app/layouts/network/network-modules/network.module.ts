import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared-modules/shared.module';
import { NetworkComponent } from '../network.component';
import { NetworkRoutingModule } from '../network-modules/network-routing.module';



@NgModule({
  declarations: [
    NetworkComponent
  ],

  imports: [
    SharedModule,
    NetworkRoutingModule
  ],

  exports: [
    NetworkComponent
  ]
})
export class NetworkModule { }
