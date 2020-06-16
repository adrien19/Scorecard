import { Component, OnInit, OnDestroy, Input, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { scorecardCreateService } from '../scorecard-create.service';
import { CreateRoleItemComponent } from './create-role-item/create-role-item.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateNameDialogComponent } from '../../../../../shared/components/create-name-dialog/create-name-dialog.component';
import { ProjectRole } from 'projects/scorecard/src/app/shared/models/role.model';
import { CreateRoleService } from './create-role-item/create-role.service';

@Component({
  selector: 'app-create-step-two',
  templateUrl: './create-step-two.component.html',
  styleUrls: ['./create-step-two.component.scss']
})
export class CreateStepTwoComponent implements OnInit, OnDestroy {

  @ViewChild("createRoleItemContainer", { read: ViewContainerRef }) container: ViewContainerRef;
  componentRef: ComponentRef<any>;

  @Input() createNewScorecardForm: FormGroup;
  projectTeamValueSubscription: Subscription;

  // projectRoles: string[];
  // projectRoleName: string;
  showCreateBanner = false;
  projectTeam: ProjectRole[] = [];
  showRemoveRoleButton = false;

  componentValidSub: Subscription;

  constructor(
    private createRoleService: CreateRoleService,
    private scorecardCreateService: scorecardCreateService,
    public dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.projectTeamValueSubscription = this.createRoleService.projectTeam$.subscribe(projectRoles => {
      this.projectTeam = projectRoles;
      this.scorecardCreateService.enteredTeamDetails$.next(projectRoles);
    });
  }

  ngOnDestroy(): void {
    if (this.projectTeamValueSubscription) {
      this.projectTeamValueSubscription.unsubscribe();
    }
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  openDialog(){
    this.showCreateBanner = true;
    this.createRoleService.createRolesDialog({ componentRef: this.componentRef, container: this.container});
  }
}
