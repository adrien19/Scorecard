import { NgModule } from '@angular/core';
import { DefaultComponent } from '../default.component';
import { SharedModule } from '../../../shared/shared-modules/shared.module';
import { DefaultRoutingModule } from './default-routing.module';
import { HeaderModule } from '../../header/header-module/header.module';



@NgModule({
  declarations: [
    DefaultComponent
  ],
  imports: [
    SharedModule, 
    DefaultRoutingModule,
    HeaderModule
  ],

  exports: [
    DefaultComponent,
    HeaderModule
  ]
})
export class DefaultModule { }
