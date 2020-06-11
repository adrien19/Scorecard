import { Injectable } from '@angular/core';
import { MatSnackBarRef, MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { SnackbarNotifComponent } from './snackbar-notif.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarNotifService {

  snackbarRef: MatSnackBarRef<SnackbarNotifComponent>;
  timeOut = 2000;

  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(configs: {message: any, className: string[], action?: string, verPosition?: MatSnackBarVerticalPosition, horPosition?: MatSnackBarHorizontalPosition}) {
    if ( configs.message instanceof Array) {
      configs.message.forEach( (message, index) => {
        setTimeout(() => {
          this.snackbarRef = this.snackBar.openFromComponent(SnackbarNotifComponent, {
            duration: this.timeOut,
            verticalPosition: configs.verPosition? configs.verPosition : 'top',
            horizontalPosition: configs.horPosition? configs.horPosition : 'right',
            panelClass: configs.className,
          });
          this.snackbarRef.instance.message = message;
          this.snackbarRef.instance.action = configs.action;

        }, index * (this.timeOut+500)); // 500 - timeout between two messages
      });
    } else {

      this.snackbarRef = this.snackBar.openFromComponent(SnackbarNotifComponent, {
        duration: this.timeOut,
        verticalPosition: configs.verPosition? configs.verPosition : 'top',
        horizontalPosition: configs.horPosition? configs.horPosition : 'right',
        panelClass: configs.className,
      });
      this.snackbarRef.instance.message = configs.message;
      this.snackbarRef.instance.action = configs.action;
    }
  }

}
