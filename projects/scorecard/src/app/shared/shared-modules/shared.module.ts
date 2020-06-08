import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import {
  NgComponentsNdikuModule,
  // NgComponentsNdikuSelectModule,
  TableLayoutModule,
} from 'projects/ng-ndiku/src/public_api';
import { SearchBarSelectedComponent } from '../search-bar/search-bar-selected/search-bar-selected.component';
import { UserSearchBarComponent } from '../../layouts/auth/user-searchbar/user-searchbar.component';
import { SearchBarSelectedUserComponent } from '../../layouts/auth/user-searchbar/search-bar-selected/search-bar-selected.component';


@NgModule({
  declarations: [SearchBarComponent, SearchBarSelectedComponent, UserSearchBarComponent, SearchBarSelectedUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgComponentsNdikuModule,
    // NgComponentsNdikuSelectModule,
    TableLayoutModule,
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SearchBarComponent,
    SearchBarSelectedComponent,
    UserSearchBarComponent,
    NgComponentsNdikuModule,
    // NgComponentsNdikuSelectModule,
    TableLayoutModule,
  ]

})
export class SharedModule { }
