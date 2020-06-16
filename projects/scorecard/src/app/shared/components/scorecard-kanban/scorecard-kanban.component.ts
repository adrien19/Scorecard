
import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from './kanban-models/board.model';
import { BoardColumn } from './kanban-models/board-column.model';
import { Task } from '../../models/task.model';
import { KanbanTaskDetailsService } from './kanban-task-details/kanban-task-details.service';
import { Role } from '../../../layouts/auth/auth-models/role';
import { ActivatedRoute, Data } from '@angular/router';
import { CreateNameDialogComponent } from '../create-name-dialog/create-name-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { SnackbarNotifService } from '../snackbar-notification/snackbar-notif.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './scorecard-kanban.component.html',
  styleUrls: ['./scorecard-kanban.component.scss']
})

export class ScorecardKanbanComponent implements OnInit {

  @Input() viewingBoard: Board;
  @Input() hideBoardTitle = false;
  newColumnName: string;

  constructor(
    private kanbanTaskDetailsService: KanbanTaskDetailsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private confirmationDialogService: ConfirmationDialogService,
    private snackbarNotifService: SnackbarNotifService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      if (data.scorecardKanbanBoard) {
        this.viewingBoard = data.scorecardKanbanBoard;
        console.log(data.scorecardKanbanBoard);
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onAddNewTasks(column: BoardColumn){
    console.log('GOING TO ADD NEW TASK');
    const dialogRef = this.dialog.open(CreateNameDialogComponent, {
      width: '350px',
      data: {name: this.newColumnName, inputFieldLabel: 'card title', dialogTitle: "Provide a brief title" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const newTask = new Task(result, 'created', new Date, false);
      const indexOfColumn  = this.viewingBoard.columns.findIndex(el => {return el.name.toLowerCase() === column.name.toLowerCase()});
      this.viewingBoard.columns[indexOfColumn].tasks.push(newTask);
    });
  }

  onDeleteTask(column: BoardColumn, item: Task){
    this.confirmationDialogService.openConfirmationDialog('Delete this card? Please conform.').subscribe((confirmed) => {
      if (confirmed) {
        const indexOfColumn  = this.viewingBoard.columns.findIndex(el => {return el.name.toLowerCase() === column.name.toLowerCase()});
        const remainingTasks = this.viewingBoard.columns[indexOfColumn].tasks.filter(el => {
        return el.description.toLowerCase() !== item.description.toLowerCase();
      })
      this.viewingBoard.columns[indexOfColumn].tasks = remainingTasks;
      }
    });
  }

  onAddNewColumn(){
    const dialogRef = this.dialog.open(CreateNameDialogComponent, {
      width: '350px',
      data: {name: this.newColumnName, inputFieldLabel: 'list name', dialogTitle: "What is the new list name?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const columnExists = this.viewingBoard.columns.some(col => col.name.toLowerCase() === result.toLowerCase());
      if (!columnExists) {
        const newBoardColumn = new BoardColumn(result);
        this.viewingBoard.columns.push(newBoardColumn);
      }else{
        this.snackbarNotifService.openSnackBar({
          message: `Sorry, ${result} already exists!`,
          className: ['bg-danger'],
          verPosition: 'top',
          horPosition: 'center',
      });
      }
    });

  }

  onDeleteColumn(column: BoardColumn){
    this.confirmationDialogService.openConfirmationDialog(`${column.name} will be deleted! Still want to continue?`).subscribe((confirmed) => {
      if (confirmed) {
        this.viewingBoard.columns = this.viewingBoard.columns.filter(el => {return el.name.toLowerCase() !== column.name.toLowerCase()});
      }
    });
  }

  onViewTaskDetails(column: BoardColumn, item: Task){
    console.log("GOING TO VIEW THIS TASK: ", column.name, item.description);

    const allBoardColumns = this.viewingBoard.columns.map((col => { return col.name })).filter(name => { return name.toLowerCase() !== column.name.toLowerCase()});
    const boardUsers = this.viewingBoard.boardMembers[0].users.map((user) => {
      const userBasicInfo = { userId: user.userId, userfullName: user.userfullName, userEmail: user.userEmail };
      return userBasicInfo;
    })

    this.kanbanTaskDetailsService.openConfirmationDialog(column, item, allBoardColumns, boardUsers).subscribe((resultsFromDialog) => {
      console.log("GOING TO SAVE: ", resultsFromDialog.task);
      console.log("USERS TO NOTIFY: ", resultsFromDialog.newMembersToNotify);

      this.kanbanTaskDetailsService.endUserConfirmedSub$.next();
    });
  }
}
