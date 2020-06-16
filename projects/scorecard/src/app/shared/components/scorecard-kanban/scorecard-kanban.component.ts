
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
      const indexOfColumn  = this.viewingBoard.columns.findIndex(el => {return el.name === column.name});
      this.viewingBoard.columns[indexOfColumn].tasks.push(newTask);
    });
  }

  onDeleteTask(column: BoardColumn, item: Task){
    this.confirmationDialogService.openConfirmationDialog('Delete this card? Please conform.').subscribe((confirmed) => {
      if (confirmed) {
        const indexOfColumn  = this.viewingBoard.columns.findIndex(el => {return el.name === column.name});
        const newTasks = this.viewingBoard.columns[indexOfColumn].tasks.filter(el => {
        return el.description === item.description;
      })
      this.viewingBoard.columns[indexOfColumn].tasks = newTasks;
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
      const newBoardColumn = new BoardColumn(result);
      this.viewingBoard.columns.push(newBoardColumn);
    });

  }

  onViewTaskDetails(column: BoardColumn, item: Task){
    console.log("GOING TO VIEW THIS TASK: ", column.name, item.description);

    const allBoardColumns = this.viewingBoard.columns.map((col => { return col.name })).filter(name => { return name !== column.name});
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
