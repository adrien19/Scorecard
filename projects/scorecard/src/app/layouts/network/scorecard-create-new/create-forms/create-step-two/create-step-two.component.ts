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
export class CreateStepTwoComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild("createRoleItemContainer", { read: ViewContainerRef }) container: ViewContainerRef;
  componentRef: ComponentRef<any>;

  @Input() createNewScorecardForm: FormGroup;
  projectTeamValueSubscription: Subscription;
  enteredProjectTeam: string;

  projectRoles: string[];
  projectRoleName: string;
  projectTeam: ProjectRole[] = [];

  componentValidSub: Subscription;

  constructor(
    private scorecardCreateService: scorecardCreateService,
    private componentResolver: ComponentFactoryResolver,
    public dialog: MatDialog
  ) {}

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes.projectTeam) {
      console.log(this.projectTeam);
    }
  }

  ngOnDestroy(): void {
    if (this.projectTeamValueSubscription) {
      this.projectTeamValueSubscription.unsubscribe();
    }
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  ngOnInit(): void {
  }

  get formControls (){
    return this.createNewScorecardForm.controls;
  }

  addChild(childName: string, childGroup: FormGroup) {
    this.createNewScorecardForm.addControl(childName, childGroup);
  }

  getInputValue(value: any){
    this.scorecardCreateService.enteredTeamDetails$.next(value);
  }

  createProjectRoleComponent(roleData: any){
    // this.container.clear();
    const factory: ComponentFactory<any> = this.componentResolver.resolveComponentFactory(CreateRoleItemComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.roleName = roleData;
    this.componentRef.instance.addSelectedUsers.subscribe((event) => {
      this.addSelectedRoleUsers(event);
    });

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CreateRoleDialogComponent, {
      width: '250px',
      data: {name: this.projectRoleName}
    });

    dialogRef.afterClosed().subscribe(result => {
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
