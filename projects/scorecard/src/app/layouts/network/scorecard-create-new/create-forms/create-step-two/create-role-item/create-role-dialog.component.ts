import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface RoleDialogData{
  name: string;
}

@Component({
  selector: 'app-create-role-dialog',
  template: `
    <h1 mat-dialog-title>What's the role name?</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Role name</mat-label>
        <input matInput [(ngModel)]="data.name">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
      <button mat-button [mat-dialog-close]="data.name" cdkFocusInitial>Ok</button>
    </div>
  `,
  styles: [``]
})
export class CreateRoleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoleDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
