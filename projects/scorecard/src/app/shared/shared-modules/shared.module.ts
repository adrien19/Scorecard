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
import { CreateRoleDialogComponent } from '../../layouts/network/scorecard-create-new/create-forms/create-step-two/create-role-item/create-role-dialog.component';
import { ErrorPageComponent } from '../components/error-page/error-page.component';
import { ScorecardKanbanComponent } from '../components/scorecard-kanban/scorecard-kanban.component';
import { KanbanTaskDetailsComponent } from '../components/scorecard-kanban/kanban-task-details/kanban-task-details.component';
import { CommentingComponent } from '../components/commeting/commenting.component';
import { CommentInputComponent } from '../components/commeting/comment-input/comment-input.component';
import { MessageItemComponent } from '../components/commeting/message-item/message-item.component';
import { CommmentItemComponent } from '../components/commeting/comment-item/comment-item.component';
import { AvatarPhotoComponent } from '../components/avatar-photo/avatar-photo.component';


@NgModule({
  declarations: [
    ...ScorecardCollectionModule,
    SearchBarComponent,
    SearchBarSelectedComponent,
    UserSearchBarComponent,
    SearchBarSelectedUserComponent,
    ConfirmationDialogComponent,
    SnackbarNotifComponent,
    CreateRoleDialogComponent,
    ErrorPageComponent,
    ScorecardKanbanComponent, // FOR TESTING KANBAN
    KanbanTaskDetailsComponent, // FOR TESTING KANBAN
    CommentingComponent, // FOR TESTING KANBAN
    CommentInputComponent, // FOR TESTING KANBAN
    MessageItemComponent, // FOR TESTING KANBAN
    CommmentItemComponent, // FOR TESTING KANBAN
    AvatarPhotoComponent,

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
    SnackbarNotifComponent,
    CreateRoleDialogComponent,
    ErrorPageComponent,
    ScorecardKanbanComponent, // FOR TESTING KANBAN
    KanbanTaskDetailsComponent, // FOR TESTING KANBAN
    CommentingComponent, // FOR TESTING KANBAN
    CommentInputComponent, // FOR TESTING KANBAN
    MessageItemComponent, // FOR TESTING KANBAN
    CommmentItemComponent, // FOR TESTING KANBAN
    AvatarPhotoComponent,
  ],
  entryComponents: [ConfirmationDialogComponent, KanbanTaskDetailsComponent]

})
export class SharedModule { }
