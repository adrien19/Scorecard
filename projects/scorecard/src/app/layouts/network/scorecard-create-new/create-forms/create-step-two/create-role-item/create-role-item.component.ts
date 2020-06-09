import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-create-role-item',
  template: `
  <mat-label>
    <span class="text-left">
      <button mat-icon-button color="warn" (click)="onDeleteProjectRole()">
        <mat-icon>delete</mat-icon>
      </button>
    </span>
    {{ roleName }}:
  </mat-label>
  <app-user-search (onSelectedUserOption)="onAddSelectedUsers($event)"></app-user-search>
  `,
  styles: [``]
})

export class CreateRoleItemComponent {

  @Input() roleName = '';
  @Output() addSelectedUsers = new EventEmitter<any>();
  @Output() deleteProjectRole = new EventEmitter<string>();

  constructor(){}

  onAddSelectedUsers(selectedUsers: any[]){
    const roleItemData = {
      roleName: this.roleName,
      roleUsers: selectedUsers,
    }
    this.addSelectedUsers.emit(roleItemData);
  }

  onDeleteProjectRole(){
    this.deleteProjectRole.emit(this.roleName);
  }
}
