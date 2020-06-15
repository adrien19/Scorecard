
import { Component, OnInit, ViewChild } from '@angular/core';
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

export class KanbanTaskDetailsComponent implements OnInit {

  @ViewChild('taskMembersSelection') taskMembersSelection: MatSelectionList;

  public task: Task;
  public boardColumn: BoardColumn;
  public boardColumns: string[];
  public boardUsers: IUserHolder[];
  oldAssignedUsers: IUserHolder[];
  alreadyAssignedMembers: string[];
  changedAssignedUsersTo: IUserHolder[];

  constructor(public dialogRef: MatDialogRef<KanbanTaskDetailsComponent>) {}

  ngOnInit() {
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

    // console.log(" NOW WE HAVE: ", newSelection);
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
    const newUsers = this.task.assignedTo.reduce((addedUsers, user) => {
      this.oldAssignedUsers.find(el => {
        if (!user.userId.indexOf(el.userId)) {
          addedUsers.push(user);
        }
      });
      return addedUsers;
    }, []);

    console.log("THESE ARE THE ADDED USERS: ", newUsers);

  }
}
