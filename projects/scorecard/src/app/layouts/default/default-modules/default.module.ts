import { NgModule } from '@angular/core';
import { DefaultComponent } from '../default.component';
import { SharedModule } from '../../../shared/shared-modules/shared.module';
import { DefaultRoutingModule } from './default-routing.module';



@NgModule({
  declarations: [
    DefaultComponent,
  ],
  imports: [
    SharedModule, 
    DefaultRoutingModule,
  ],

  exports: [
    DefaultComponent,
  ]
})
export class DefaultModule { }
