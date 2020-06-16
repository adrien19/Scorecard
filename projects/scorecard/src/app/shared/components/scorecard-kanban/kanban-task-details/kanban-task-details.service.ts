import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { KanbanTaskDetailsComponent } from './kanban-task-details.component';
import { BoardColumn } from '../kanban-models/board-column.model';
import { Task } from '../../../models/task.model';
import { IUserHolder } from '../../../models/scorecard-item';

@Injectable({
  providedIn: 'root'
})
export class KanbanTaskDetailsService {

  dialogRef: MatDialogRef<KanbanTaskDetailsComponent>;
  endUserConfirmedSub$ = new Subject<void>();

  moveTaskCardToOtherColumn$ = new Subject<{ task: Task, columnName: string }>();
  assignUserToTask$ = new Subject<{ task: Task, userHolder: IUserHolder }>();

  constructor(public dialog: MatDialog) {}

  openConfirmationDialog(boardColumn: BoardColumn, task: Task, allBoardColumns: string[], boardUsers: IUserHolder[]): Observable<{task: Task, newMembersToNotify: IUserHolder[]}> {
    this.dialogRef = this.dialog.open(KanbanTaskDetailsComponent, {
      width: '85%',
      height: '80%',
      disableClose: false
    });
    this.dialogRef.componentInstance.boardColumn = boardColumn;
    this.dialogRef.componentInstance.task = task;
    this.dialogRef.componentInstance.boardColumns = allBoardColumns;
    this.dialogRef.componentInstance.boardUsers = boardUsers;
    this.dialogRef.componentInstance.oldAssignedUsers = task.assigned? task.assignedTo : [];
    // this.dialogRef.componentInstance.alreadyAssignedMembers = task.assigned && task.assignedTo.length !== 0 ? task.assignedTo.map(user => { return user.userId }) : [];



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
