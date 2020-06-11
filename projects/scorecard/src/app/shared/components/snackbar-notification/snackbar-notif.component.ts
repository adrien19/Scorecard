import { Component } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  template: `
      <span>
      {{ message }}
      </span>
      <button mat-flat-button *ngIf="action" (click)="onActionClicked()">{{ action }}</button>
  `,
  styles: [``]
})

export class SnackbarNotifComponent {

  message: string;
  action: string;

  constructor(
    // public snackBar: MatSnackBar
  ) { }

  onActionClicked(){
    console.log("action was taken");

  }
}
