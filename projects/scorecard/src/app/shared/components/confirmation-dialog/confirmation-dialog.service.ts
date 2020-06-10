import { Injectable } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  endUserConfirmedSub$ = new Subject<void>();

  constructor(public dialog: MatDialog) {}

  openConfirmationDialog(message: string): Observable<boolean> {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = message;

    return this.dialogRef.afterClosed().pipe(
      takeUntil(this.endUserConfirmedSub$),
      tap(result => {
        if (result) {
        }else{
          this.dialogRef = null;
        }
      })
    );

  }


}
