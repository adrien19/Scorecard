import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from '../search-bar/search-bar.component';



@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    
  ],

  exports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    SearchBarComponent
  ]
})
export class SharedModule { }
