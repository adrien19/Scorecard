import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import {
  NgComponentsNdikuModule,
  // NgComponentsNdikuSelectModule,
  TableLayoutModule,
} from 'projects/ng-ndiku/src/public_api';
import { ScorecardCollectionModule } from '../components/scorecard-collection/scorecard-collection-modules/scorecard-collection.module';
import { SearchBarSelectedComponent } from '../search-bar/search-bar-selected/search-bar-selected.component';
import { UserSearchBarComponent } from '../../layouts/auth/user-searchbar/user-searchbar.component';
import { SearchBarSelectedUserComponent } from '../../layouts/auth/user-searchbar/search-bar-selected/search-bar-selected.component';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarNotifComponent } from '../components/snackbar-notification/snackbar-notif.component';


@NgModule({
  declarations: [
    ...ScorecardCollectionModule,
    SearchBarComponent,
    SearchBarSelectedComponent,
    UserSearchBarComponent,
    SearchBarSelectedUserComponent,
    ConfirmationDialogComponent,
    SnackbarNotifComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    NgComponentsNdikuModule,
    // NgComponentsNdikuSelectModule,
    TableLayoutModule,
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ...ScorecardCollectionModule,
    SearchBarComponent,
    SearchBarSelectedComponent,
    UserSearchBarComponent,
    NgComponentsNdikuModule,
    // NgComponentsNdikuSelectModule,
    TableLayoutModule,
    ConfirmationDialogComponent,
    SnackbarNotifComponent
  ],
  entryComponents: [ConfirmationDialogComponent]

})
export class SharedModule { }
