import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColumnSetting, TableInlineEditService, TableEntryType } from 'projects/ng-ndiku/src/public_api';
import { Network } from '../../../shared/models/network.model';
import { TableDataService } from './details-data.service';
import { CardStatus } from '../../../shared/models/scorecard-item';


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

  managementDisplayedColumns: string[] = ['overall', 'quality', 'time', 'cost', 'actions'];
  managementDataSource = STATUS_DATA;

  statusDisplayedColumns: string[] = ['prime', 'other'];
  statusDataSource = MANAGEMEMT_DATA;

  overallStatusTable: TableEntryType;
  overallStatusData: CardStatus[];
  overallStatusColsConfig: ColumnSetting[];
  overallStatusTableSub: Subscription;

  networksTable: TableEntryType;
  networksData: Network[];
  networkColsConfig: ColumnSetting[];
  networksTableSub: Subscription;

  id: number;
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
  }

  ngOnInit(): void {
    console.log(this.route);
    this.routeSub = this.route.params.subscribe( (params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
    });
    this.setupOverallStatusTable();
    this.setupNetworksTable();
  }

  setupOverallStatusTable() {
    this.overallStatusData = this.detailsDataService.getCardOverallStatus();
    this.overallStatusColsConfig = this.detailsDataService.getOverallStatusColConfigs();
    this.overallStatusTable = new TableEntryType(
      'mat-table',
      'overallCardStatus',
      this.overallStatusData,
      true,
      4
    );
  }

  updateOverallStatusTable(){
    this.overallStatusTableSub = this.inlineEditTableService.dataSource$.subscribe((data) => {
      if (data) {
        data.table.clearEditedCells(this.overallStatusTable.tableId); // clear the data edit history after save
        this.overallStatusTable = data.table;
      }
    });
  }

  setupNetworksTable(){
    this.networksData = this.detailsDataService.getNetworks();
    this.networkColsConfig = this.detailsDataService.getColConfigs();
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
