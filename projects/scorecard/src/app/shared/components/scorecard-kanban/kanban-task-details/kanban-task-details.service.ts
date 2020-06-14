import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { KanbanTaskDetailsComponent } from './kanban-task-details.component';
import { BoardColumn } from '../kanban-models/board-column.model';
import { Task } from '../../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class KanbanTaskDetailsService {

  dialogRef: MatDialogRef<KanbanTaskDetailsComponent>;
  endUserConfirmedSub$ = new Subject<void>();

  constructor(public dialog: MatDialog) {}

  openConfirmationDialog(boardColumn: BoardColumn, task: Task): Observable<Task> {
    this.dialogRef = this.dialog.open(KanbanTaskDetailsComponent, {
      width: '85%',
      height: '80%',
      disableClose: false
    });
    this.dialogRef.componentInstance.boardColumn = boardColumn;
    this.dialogRef.componentInstance.task = task;


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
