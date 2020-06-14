
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../models/task.model';
import { BoardColumn } from '../kanban-models/board-column.model';

@Component({
  selector: 'app-kanban-task-details',
  templateUrl: './kanban-task-details.component.html',
  styleUrls: ['./kanban-task-details.component.scss']
})

export class KanbanTaskDetailsComponent implements OnInit {


  public task: Task;
  public boardColumn: BoardColumn;

  constructor(public dialogRef: MatDialogRef<KanbanTaskDetailsComponent>) {}

  ngOnInit() { }
}
