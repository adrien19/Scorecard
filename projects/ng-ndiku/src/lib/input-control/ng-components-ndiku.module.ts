import { NgModule } from '@angular/core';
import { NgComponentsNdikuComponent } from './ng-components-ndiku.input.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material.module';
// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [NgComponentsNdikuComponent],
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [NgComponentsNdikuComponent],
})
export class NgComponentsNdikuModule {}
