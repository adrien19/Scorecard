import { Component, OnInit, OnDestroy, Input, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { scorecardCreateService } from '../scorecard-create.service';
import { CreateRoleItemComponent } from './create-role-item/create-role-item.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoleDialogComponent } from './create-role-item/create-role-dialog.component';
import { ProjectRole } from 'projects/scorecard/src/app/shared/models/role.model';

@Component({
  selector: 'app-create-step-two',
  templateUrl: './create-step-two.component.html',
  styleUrls: ['./create-step-two.component.scss']
})
export class CreateStepTwoComponent implements OnDestroy {

  @ViewChild("createRoleItemContainer", { read: ViewContainerRef }) container: ViewContainerRef;
  componentRef: ComponentRef<any>;

  @Input() createNewScorecardForm: FormGroup;
  projectTeamValueSubscription: Subscription;

  projectRoles: string[];
  projectRoleName: string;
  projectTeam: ProjectRole[] = [];
  showRemoveRoleButton = false;

  componentValidSub: Subscription;

  constructor(
    private scorecardCreateService: scorecardCreateService,
    private componentResolver: ComponentFactoryResolver,
    public dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    if (this.projectTeamValueSubscription) {
      this.projectTeamValueSubscription.unsubscribe();
    }
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  createProjectRoleComponent(roleData: any){
    // this.container.clear();
    const factory: ComponentFactory<any> = this.componentResolver.resolveComponentFactory(CreateRoleItemComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.roleName = roleData;
    this.projectTeamValueSubscription = this.componentRef.instance.addSelectedUsers.subscribe((event) => {
      this.addSelectedRoleUsers(event);
    });
    this.componentRef.instance.deleteProjectRole.subscribe((event) => {
      console.log(event);
      if (this.projectTeam.length !== 0) {
        this.projectTeam = this.projectTeam.filter(role => role.title !== event);
      }
      this.componentRef.destroy();
      console.log(this.projectTeam);

    });

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CreateRoleDialogComponent, {
      width: '350px',
      data: {name: this.projectRoleName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.createProjectRoleComponent(result);

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
    this.scorecardCreateService.enteredTeamDetails$.next(this.projectTeam);
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
