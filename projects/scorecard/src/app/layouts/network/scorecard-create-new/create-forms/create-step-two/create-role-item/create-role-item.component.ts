import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-create-role-item',
  template: `
  <mat-label>{{ roleName }}:</mat-label>
  <app-user-search (onSelectedUserOption)="onAddSelectedUsers($event)"></app-user-search>
  `,
  styles: [``]
})

export class CreateRoleItemComponent {

  @Input() roleName = '';
  @Output() addSelectedUsers = new EventEmitter<any>();

  constructor(){}

  onAddSelectedUsers(selectedUsers: any[]){
    const roleItemData = {
      roleName: this.roleName,
      roleUsers: selectedUsers,
    }
    this.addSelectedUsers.emit(roleItemData);
  }
}
