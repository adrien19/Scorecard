import { Injectable, ComponentFactory, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { ProjectRole } from 'projects/scorecard/src/app/shared/models/role.model';
import { CreateNameDialogComponent } from '../../../../../../shared/components/create-name-dialog/create-name-dialog.component';
import { CreateRoleItemComponent } from './create-role-item.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CreateRoleService {

  projectTeam: ProjectRole[] = [];
  projectRoleName: string;
  projectTeam$ = new Subject<ProjectRole[]>();

  constructor(
    private componentResolver: ComponentFactoryResolver,
    public dialog: MatDialog
  ){}



  createRolesDialog(config: {componentRef: ComponentRef<any>, container: ViewContainerRef}): void {
    const dialogRef = this.dialog.open(CreateNameDialogComponent, {
      width: '350px',
      data: {name: this.projectRoleName, inputFieldLabel: 'Role name', dialogTitle: "What is the role name?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.createProjectRoleComponent(result, config.componentRef, config.container);

    });
  }

  createProjectRoleComponent(roleData: any, componentRef: ComponentRef<any>, container: ViewContainerRef){
    // this.container.clear();
    const factory: ComponentFactory<any> = this.componentResolver.resolveComponentFactory(CreateRoleItemComponent);
    componentRef = container.createComponent(factory);
    componentRef.instance.roleName = roleData;
    componentRef.instance.addSelectedUsers.subscribe((event) => {
      this.addSelectedRoleUsers(event);
    });
    componentRef.instance.deleteProjectRole.subscribe((event) => {
      console.log(event);
      if (this.projectTeam.length !== 0) {
        this.projectTeam = this.projectTeam.filter(role => role.title !== event);
      }
      componentRef.destroy();
      console.log(this.projectTeam);
    });
  }

  addSelectedRoleUsers(projectRole: any){

    const createdRole: ProjectRole = {
      title: projectRole.roleName,
      users: projectRole.roleUsers
    }
    const indexOfRole = this.projectTeam.length !== 0 ? this.roleAlreadyExists(createdRole.title) : -1;
    if(indexOfRole !== -1){
      this.projectTeam[indexOfRole] = createdRole;
    }else{
      this.projectTeam.push(createdRole);
    }
    console.log(this.projectTeam);
    // this.scorecardCreateService.enteredTeamDetails$.next(this.projectTeam);
    this.projectTeam$.next(this.projectTeam);

  }

  roleAlreadyExists(title: string){
    let roleIndex = -1;
    this.projectTeam.find((role, index) => {
      if (role.title && role.title === title){
        roleIndex = index;
      }
    });
    return roleIndex;
  }

}
