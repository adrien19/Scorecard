
import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from './kanban-models/board.model';
import { BoardColumn } from './kanban-models/board-column.model';
import { Task } from '../../models/task.model';
import { KanbanTaskDetailsService } from './kanban-task-details/kanban-task-details.service';
import { Role } from '../../../layouts/auth/auth-models/role';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-kanban',
  templateUrl: './scorecard-kanban.component.html',
  styleUrls: ['./scorecard-kanban.component.scss']
})

export class ScorecardKanbanComponent implements OnInit {

  @Input() viewingBoard: Board =

  new Board('Test Board', [
    new BoardColumn('MY BACKLOGS', [
      new Task('description', 'in progress', new Date, true)
    ]),
    new BoardColumn('MY RESEARCH', [
      new Task('Research', 'completed', new Date, true)
    ]),
    new BoardColumn('MY DONE', [
      new Task('read texts here', 'archived', new Date, false)
    ]),
  ]);

  constructor(
    private kanbanTaskDetailsService: KanbanTaskDetailsService,
    private route: ActivatedRoute,
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

    const newTask = new Task('Building an application', 'completed', new Date, true);
    const indexOfColumn  = this.viewingBoard.columns.findIndex(el => {return el.name === column.name});
    this.viewingBoard.columns[indexOfColumn].tasks.push(newTask);
  }

  onDeleteTask(column: BoardColumn, item: Task){
    const indexOfColumn  = this.viewingBoard.columns.findIndex(el => {return el.name === column.name});
    const newTasks = this.viewingBoard.columns[indexOfColumn].tasks.filter(el => {
      return el.description === item.description;
    })
    this.viewingBoard.columns[indexOfColumn].tasks = newTasks;
  }

  onViewTaskDetails(column: BoardColumn, item: Task){
    console.log("GOING TO VIEW THIS TASK: ", column.name, item.description);
    item.assignedTo = [
      {
        userId: 'jaisdasruo',
        username: 'adrien.K',
        password: 'user123',
        role: Role.Admin,
        userEmail: 'user1@test.com',
        userFirstName: 'Adrien',
        userLastName: 'K.',
        userfullName: 'adrien K.'
        // canEditCard?: Scorecard[];
        // canViewCard?: Scorecard[];
      },
      {
        userId: 'jashlasjhsd',
        username: 'Mike.D',
        password: 'user123',
        role: Role.User,
        userEmail:'user2@test.com',
        userFirstName: 'Mike',
        userLastName: 'D.',
        userfullName: 'Mike D.'
        // canEditCard?: Scorecard[];
        // canViewCard?: Scorecard[];
      },
    ]

    this.kanbanTaskDetailsService.openConfirmationDialog(column, item).subscribe((toSaveTask) => {
      console.log("GOING TO SAVE: ", toSaveTask);

      this.kanbanTaskDetailsService.endUserConfirmedSub$.next();
    });
  }
}
