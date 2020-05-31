import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import {
  NgComponentsNdikuModule,
  NgComponentsNdikuSelectModule,
  TableLayoutModule,
} from 'projects/ng-ndiku/src/public_api';


@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgComponentsNdikuModule,
    NgComponentsNdikuSelectModule,
    TableLayoutModule,
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SearchBarComponent,
    // NgComponentsNdikuModule,
    // NgComponentsNdikuSelectModule,
    TableLayoutModule,
  ]
})
export class SharedModule { }
