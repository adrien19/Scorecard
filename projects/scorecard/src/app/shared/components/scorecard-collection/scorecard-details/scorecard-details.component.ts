import { Component, OnInit, OnDestroy, OnChanges, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColumnSetting, TableInlineEditService, TableEntryType } from 'projects/ng-ndiku/src/public_api';
import { TableDataService, ImanagementTableData } from './details-data.service';
import { CardRating, Scorecard } from '../../../models/scorecard-item';
import { Network } from '../../../models/network.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoleDialogComponent } from 'projects/scorecard/src/app/layouts/network/scorecard-create-new/create-forms/create-step-two/create-role-item/create-role-dialog.component';
import { CreateRoleService } from 'projects/scorecard/src/app/layouts/network/scorecard-create-new/create-forms/create-step-two/create-role-item/create-role.service';
import { take, tap } from 'rxjs/operators';
import { DataService } from 'projects/scorecard/src/app/layouts/network/data.service';


@Component({
  selector: 'app-scorecard-details',
  templateUrl: './scorecard-details.component.html',
  styleUrls: ['./scorecard-details.component.scss']
})
export class ScorecardDetailsComponent implements OnInit, OnDestroy {

  @ViewChild("createRoleItemContainerInDetails", { read: ViewContainerRef }) container: ViewContainerRef;
  componentRef: ComponentRef<any>;

  managementTable: TableEntryType;
  managementData: ImanagementTableData[];
  managementColsConfig: ColumnSetting[];
  managementTableSub: Subscription;

  overallStatusTable: TableEntryType;
  overallStatusData: CardRating[];
  overallStatusColsConfig: ColumnSetting[];
  overallStatusTableSub: Subscription;

  networksTable: TableEntryType;
  networksData: Network[];
  networkColsConfig: ColumnSetting[];
  networksTableSub: Subscription;
  showMilestoneTable = false;

  id: number;
  detailedScorecard: Scorecard;
  cardInEditMode = false;
  routeSub: Subscription;

  // For creating new project roles
  editProjectTeamEnabled = false;
  projectTeamUploadSubscription: Subscription;

  // For editing project goal
  editProjectGoalEnabled = false;

  constructor(
    private dialog: MatDialog, // creating new role
    private createRoleService: CreateRoleService, // creating new role
    private dataService: DataService, // For sending edited data to backend
    private router: Router,
    private route: ActivatedRoute,
    private detailsDataService: TableDataService,
    private inlineEditTableService: TableInlineEditService,
  ) { }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.networksTableSub) {
      this.networksTableSub.unsubscribe();
    }
    if (this.overallStatusTableSub) {
      this.overallStatusTableSub.unsubscribe();
    }
    if (this.managementTableSub) {
      this.managementTableSub.unsubscribe();
    }
    if (this.projectTeamUploadSubscription) {
      this.projectTeamUploadSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe( (params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.detailedScorecard = this.detailsDataService.getScorecardData(this.id); // to be removed
      console.log(this.detailedScorecard.primes.principal);

    });
    this.setupOverallStatusTable(this.detailedScorecard);
    this.setupManagementPrimesTable(this.detailedScorecard);
    if (this.detailedScorecard.milestones) {
      this.showMilestoneTable = true;
    } else {
      this.showMilestoneTable = false;
      this.detailedScorecard.milestones = [];
    }
    this.setupNetworksTable(this.detailedScorecard);
  }

  setupOverallStatusTable(scorecard: Scorecard) {
    this.overallStatusData = [scorecard.status] // this.detailsDataService.getCardOverallStatus();
    this.overallStatusColsConfig = this.detailsDataService.getOverallStatusColConfigs();
    this.overallStatusTable = new TableEntryType(
      'mat-table',
      'overallCardStatus',
      this.overallStatusData,
      true,
      4
    );
  }

  updateTables(){
    this.overallStatusTableSub = this.inlineEditTableService.dataSource$.subscribe((data) => {
      if (data && data.table.tableId === this.overallStatusTable.tableId) {
        // data.table.clearEditedCells(this.overallStatusTable.tableId); // clear the data edit history after save
        this.overallStatusTable = data.table;
      }
      if (data && data.table.tableId === this.managementTable.tableId) {
        // data.table.clearEditedCells(this.overallStatusTable.tableId); // clear the data edit history after save
        this.managementTable = data.table;
      }
    });
  }

  setupManagementPrimesTable(scorecard: Scorecard){
    this.managementData = this.detailsDataService.getManagementPrimesData(scorecard);
    // console.log(`${Object.entries(this.managementData[0].primary[0].userLoginId)}`);
    console.log(scorecard.primes.principal);

    this.managementColsConfig = this.detailsDataService.getManagementPrimesColConfigs();
    this.managementTable = new TableEntryType(
      'mat-table',
      'managementPrimesTable',
      this.managementData,
      true,
      2
    );
  }

  setupNetworksTable(scorecard: Scorecard){
    this.networksData = scorecard.milestones // this.detailsDataService.getNetworks();
    this.networkColsConfig = this.detailsDataService.getNetworksColConfigs();
    this.networksTable = new TableEntryType(
      'default',
      'networksTable',
      this.networksData,
      false,
    );
  }

  onEditCard(){
    this.cardInEditMode = !this.cardInEditMode;
    console.log(`this is the value: ${this.cardInEditMode}`);

  }

  onSaveCard(){
    this.cardInEditMode = !this.cardInEditMode;
    console.log(`ON SAVE this is the value: ${this.cardInEditMode}`);
    this.clearEditedTableData();
    if(this.container){this.container.clear()} // remove the added compenents for editing
    this.projectTeamUploadSubscription = this.dataService.uploadEditedProjectRoles(this.detailedScorecard.id, this.detailedScorecard.team).subscribe(data => {
      this.createRoleService.projectTeam = []; // reset to default
      console.log(data.taskCompletion);
    }); // Upload edited project roles
    this.editProjectTeamEnabled = false; // disable project team editing mode


    this.dataService.uploadModifiedProjectGoal(this.detailedScorecard.id, this.detailedScorecard.goal); // uploading modified goal
    this.editProjectGoalEnabled = false; // disable project goal editing mode
  }

  clearEditedTableData() {
    if (this.overallStatusTable.hasBeenEdited(this.overallStatusTable.tableId)) {
      this.overallStatusTable.clearEditedCells(this.overallStatusTable.tableId);
    }
    this.inlineEditTableService.clearSavedDataInitiated$.next(); // send an event to clear colored edited data
  }



  // BELOW METHODS ARE FOR CREATING/MODIFYING AND DELETING PROJECT ROLES
  onDeleteProjectRoleInDetails(roleTitle: string){
    const newTeam = this.detailedScorecard.team.filter(role => { return role.title !== roleTitle});
    this.detailedScorecard.team = newTeam;
  }
  onAddProjectRoles(){
    console.log("Going to add roles!");
    this.editProjectTeamEnabled = true;
    this.openDialog();
  }

  openDialog(): void {
    this.createRoleService.projectTeam = this.detailedScorecard.team;
    this.createRoleService.createRolesDialog({ componentRef: this.componentRef, container: this.container});
  }

  // BELOW METHODS ARE FOR EDITING PROJECT GOAL
  onEditProjectGoal(){
    this.editProjectGoalEnabled = true;
  }



}
