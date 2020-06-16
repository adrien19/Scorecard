import { Component, Inject, ViewChild, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, NgModel } from '@angular/forms';

export interface RoleDialogData{
  name: string;
  dialogTitle: string;
  inputFieldLabel: string;
}

@Component({
  selector: 'app-create-role-dialog',
  template: `
    <div class="text-center">
      <h1 mat-dialog-title> {{ data.dialogTitle }} </h1>
      <div mat-dialog-content>
        <mat-form-field>
          <mat-label>{{ data.inputFieldLabel }}</mat-label>
          <input matInput [(ngModel)]="data.name" required #roleNameInput="ngModel">
        </mat-form-field>
      </div>
      <div mat-dialog-actions class="justify-content-between">
        <button mat-button (click)="onNoClick()">Cancel</button>
        <button mat-button [mat-dialog-close]="data.name"
          [disabled]="roleNameInput.invalid"
          >
          Add Role
        </button>
      </div>
    </div>
  `,
  styles: [``]
})
export class CreateNameDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoleDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
