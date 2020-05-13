import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ],

  exports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
