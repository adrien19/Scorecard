
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from './kanban-models/board.model';
import { BoardColumn } from './kanban-models/board-column.model';
import { Task } from '../../models/task.model';
import { KanbanTaskDetailsService } from './kanban-task-details/kanban-task-details.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './scorecard-kanban.component.html',
  styleUrls: ['./scorecard-kanban.component.scss']
})

export class ScorecardKanbanComponent implements OnInit {

  testBoard = new Board('Test Board', [
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
    private kanbanTaskDetailsService: KanbanTaskDetailsService
  ) { }

  ngOnInit() { }

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
    const indexOfColumn  = this.testBoard.columns.findIndex(el => {return el.name === column.name});
    this.testBoard.columns[indexOfColumn].tasks.push(newTask);
  }

  onDeleteTask(column: BoardColumn, item: Task){
    const indexOfColumn  = this.testBoard.columns.findIndex(el => {return el.name === column.name});
    const newTasks = this.testBoard.columns[indexOfColumn].tasks.filter(el => {
      return el.description === item.description;
    })
    this.testBoard.columns[indexOfColumn].tasks = newTasks;
  }

  onViewTaskDetails(column: BoardColumn, item: Task){
    console.log("GOING TO VIEW THIS TASK: ", column.name, item.description);

    this.kanbanTaskDetailsService.openConfirmationDialog(column, item).subscribe((toSaveTask) => {
      console.log("GOING TO SAVE: ", toSaveTask);

      this.kanbanTaskDetailsService.endUserConfirmedSub$.next();
    });
  }
}
