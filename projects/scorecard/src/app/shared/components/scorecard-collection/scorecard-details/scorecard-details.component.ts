import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColumnSetting, TableInlineEditService, TableEntryType } from 'projects/ng-ndiku/src/public_api';
import { TableDataService, ImanagementTableData } from './details-data.service';
import { CardRating, Scorecard } from '../../../models/scorecard-item';
import { Network } from '../../../models/network.model';


@Component({
  selector: 'app-scorecard-details',
  templateUrl: './scorecard-details.component.html',
  styleUrls: ['./scorecard-details.component.scss']
})
export class ScorecardDetailsComponent implements OnInit, OnDestroy {


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

  constructor(
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
  }

  clearEditedTableData() {
    if (this.overallStatusTable.hasBeenEdited(this.overallStatusTable.tableId)) {
      this.overallStatusTable.clearEditedCells(this.overallStatusTable.tableId);
    }
    this.inlineEditTableService.clearSavedDataInitiated$.next(); // send an event to clear colored edited data
  }



}
