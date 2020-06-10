import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogService } from './confirmation-dialog.service';

@Component({
  selector: 'confirm-dialog',
  template: `
    <h1 mat-dialog-title class="text-center">Confirmation</h1>
    <div mat-dialog-content class="text-center">{{confirmMessage}}</div>
    <div mat-dialog-actions class="justify-content-between mt-3">
      <button mat-flat-button color="warn" (click)="dialogRef.close(true)">Confirm</button>
      <button mat-flat-button (click)="dialogRef.close(false)">Cancel</button>
    </div>
  `,
  styles: [``]
})
export class ConfirmationDialogComponent {

  public confirmMessage:string;
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

}
