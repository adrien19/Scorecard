import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColumnSetting, TableInlineEditService, TableEntryType } from 'projects/ng-ndiku/src/public_api';
import { TableDataService } from './details-data.service';
import { Scorecard } from '../../../models/scorecard-item';
import { CreateRoleService } from 'projects/scorecard/src/app/layouts/network/scorecard-create-new/create-forms/create-step-two/create-role-item/create-role.service';
import { DataService } from 'projects/scorecard/src/app/shared/services/data.service';


@Component({
  selector: 'app-scorecard-details',
  templateUrl: './scorecard-details.component.html',
  styleUrls: ['./scorecard-details.component.scss']
})
export class ScorecardDetailsComponent implements OnInit, OnDestroy {

  @ViewChild("createRoleItemContainerInDetails", { read: ViewContainerRef }) container: ViewContainerRef;
  componentRef: ComponentRef<any>;

  managementTable: TableEntryType;
  managementColsConfig: ColumnSetting[];
  managementTableSub: Subscription;

  overallStatusTable: TableEntryType;
  overallStatusColsConfig: ColumnSetting[];
  overallStatusTableSub: Subscription;

  networksTable: TableEntryType;
  networkColsConfig: ColumnSetting[];
  networksTableSub: Subscription;
  showMilestoneTable = false;

  id: string;
  detailedScorecard: Scorecard;
  // detailedScorecard$: Observable<Scorecard>;
  dataServiceSubscription: Subscription;
  cardInEditMode = false;
  routeSub: Subscription;

  // For creating new project roles
  editProjectTeamEnabled = false;
  projectTeamUploadSubscription: Subscription;

  // For editing project goal
  editProjectGoalEnabled = false;

  constructor(
    // private dialog: MatDialog, // creating new role
    private createRoleService: CreateRoleService, // creating new role
    private dataService: DataService, // For sending edited data to backend
    private route: ActivatedRoute,
    private detailsDataService: TableDataService,
    private inlineEditTableService: TableInlineEditService,
  ) { }


  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.dataServiceSubscription) {
      this.dataServiceSubscription.unsubscribe();
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
    this.routeSub = this.route.data.subscribe((data: Data) => {
      this.detailedScorecard = data['detailedScorecard'];

      this.setupOverallStatusTable(this.detailedScorecard);
      this.setupManagementPrimesTable(this.detailedScorecard);
      if (data.milestones) {
        this.showMilestoneTable = true;
      } else {
        this.showMilestoneTable = false;
        this.detailedScorecard.milestones = [];
      }
      this.setupNetworksTable(this.detailedScorecard);
    });

  }

  setupOverallStatusTable(scorecard: Scorecard) {
    this.overallStatusColsConfig = this.detailsDataService.getOverallStatusColConfigs();
    this.overallStatusTable = new TableEntryType(
      'mat-table',
      'overallCardStatus',
      [scorecard.status],
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
    const principalNames = scorecard.primes.principal.map( prime => {
      return prime.userfullName;
    });
    const secondaryNames = scorecard.primes.secondary.map( prime => {
      return prime.userfullName;
    });
    const managementTableData = [{
      prime: principalNames,
      others: secondaryNames,
    }]

    this.managementColsConfig = this.detailsDataService.getManagementPrimesColConfigs();
    this.managementTable = new TableEntryType(
      'mat-table',
      'managementPrimesTable',
      managementTableData,
      true,
      2
    );
  }

  setupNetworksTable(scorecard: Scorecard){
    this.networkColsConfig = this.detailsDataService.getNetworksColConfigs();
    this.networksTable = new TableEntryType(
      'default',
      'networksTable',
      scorecard.milestones,
      false,
    );
  }

  onDisableEditingScorecard(){
    this.cardInEditMode = !this.cardInEditMode;
    console.log(`this is the value: ${this.cardInEditMode}`);

  }

  onEnableEditingScorecard(){
    this.cardInEditMode = !this.cardInEditMode;
    console.log(`ON SAVE this is the value: ${this.cardInEditMode}`);
    this.clearEditedTableData();
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

  onSaveProjectRoles(){
    if(this.container){this.container.clear()} // remove the added compenents for editing
    this.projectTeamUploadSubscription = this.dataService.uploadEditedProjectRoles(this.detailedScorecard.id, this.detailedScorecard.team).subscribe(data => {
      this.createRoleService.projectTeam = []; // reset to default
      console.log(data.taskCompletion);
    }); // Upload edited project roles
    this.editProjectTeamEnabled = false; // disable project team editing mode
  }

  // BELOW METHODS ARE FOR EDITING PROJECT GOAL
  onEditProjectGoal(){
    this.editProjectGoalEnabled = true;
  }

  onSaveEditedProjectGoal(){
    this.dataService.uploadModifiedProjectGoal(this.detailedScorecard.id, this.detailedScorecard.goal); // uploading modified goal
    this.editProjectGoalEnabled = false; // disable project goal editing mode
  }

}
