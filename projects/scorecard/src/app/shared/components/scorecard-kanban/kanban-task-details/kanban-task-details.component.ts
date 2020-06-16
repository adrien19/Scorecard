
import { Component, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../models/task.model';
import { BoardColumn } from '../kanban-models/board-column.model';
import { IUserHolder } from '../../../models/scorecard-item';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-kanban-task-details',
  templateUrl: './kanban-task-details.component.html',
  styleUrls: ['./kanban-task-details.component.scss']
})

export class KanbanTaskDetailsComponent implements OnInit, OnChanges {

  @ViewChild('taskMembersSelection') taskMembersSelection: MatSelectionList;

  public task: Task;
  public newUsersToNotify: IUserHolder[];
  public boardColumn: BoardColumn;
  public boardColumns: string[];
  public boardUsers: IUserHolder[];
  oldAssignedUsers: IUserHolder[];
  alreadyAssignedMembers: string[];
  changedAssignedUsersTo: IUserHolder[];

  constructor(public dialogRef: MatDialogRef<KanbanTaskDetailsComponent>) {}

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
    this.alreadyAssignedMembers = this.task.assigned && this.task.assignedTo.length !== 0 ? this.task.assignedTo.map(user => { return user.userId }) : [];
    this.changedAssignedUsersTo = this.task.assignedTo;
  }

  onNgModelChange(event: any[]){
    const newSelection = event.reduce((cummulator, currentValue) => {
      this.boardUsers.find(el => {
        if (el.userId === currentValue){
          cummulator.push(el);
        }
      });
      return cummulator;
    }, [])

    this.changedAssignedUsersTo = newSelection;
    this.task.assignedTo = this.changedAssignedUsersTo;
    this.checkChangedUsers(); // for updating or notifying user of being added
    if (this.task.assignedTo.length !== 0) {
      this.task.assigned = true;
    }else{
      this.task.assigned = false;
    }

  }

  checkChangedUsers(){
    this.newUsersToNotify = this.task.assignedTo.filter(member => {
      return this.oldAssignedUsers.indexOf(member) === -1;
    });
  }
}
