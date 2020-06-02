import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColumnSetting, TableInlineEditService, TableEntryType } from 'projects/ng-ndiku/src/public_api';
import { Network } from '../../../shared/models/network.model';
import { TableDataService } from './details-data.service';
import { CardRating, Scorecard } from '../../../shared/models/scorecard-item';
import { Role, PrimeRole } from '../../../shared/models/role.model';


export interface statusData {
  overall: string;
  quality: string;
  time: string;
  cost: string;
}

export interface managementData {
  prime: string;
  other: string[];
}

const STATUS_DATA: statusData[] = [
  {overall: 'Y', quality: 'G', time: 'G', cost: 'G'},
];

const MANAGEMEMT_DATA: managementData[] = [
  {prime: 'Y', other: ['Mike K.', 'John D.']},
];

@Component({
  selector: 'app-scorecard-details',
  templateUrl: './scorecard-details.component.html',
  styleUrls: ['./scorecard-details.component.scss']
})
export class ScorecardDetailsComponent implements OnInit, OnDestroy {

  // managementDisplayedColumns: string[] = ['overall', 'quality', 'time', 'cost', 'actions'];
  // managementDataSource = STATUS_DATA;

  // statusDisplayedColumns: string[] = ['prime', 'other'];
  // statusDataSource = MANAGEMEMT_DATA;

  managementTable: TableEntryType;
  managementData: PrimeRole[];
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
    });
    this.setupOverallStatusTable(this.detailedScorecard);
    this.setupManagementPrimesTable(this.detailedScorecard);
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
