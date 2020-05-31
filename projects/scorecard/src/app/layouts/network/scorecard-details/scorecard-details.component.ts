import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColumnSetting, TableInlineEditService, TableEntryType } from 'projects/ng-ndiku/src/public_api';
import { Network } from '../../../shared/models/network.model';
import { TableDataService } from './details-data.service';


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

  managementDisplayedColumns: string[] = ['overall', 'quality', 'time', 'cost'];
  managementDataSource = STATUS_DATA;

  statusDisplayedColumns: string[] = ['prime', 'other'];
  statusDataSource = MANAGEMEMT_DATA;

  networksTable: TableEntryType;
  networksData: Network[];
  networkColsConfig: ColumnSetting[];
  networksTableSub: Subscription;

  id: number;
  routeSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private detailsDataService: TableDataService,
  ) { }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.networksTableSub) {
      this.networksTableSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    console.log(this.route);
    this.routeSub = this.route.params.subscribe( (params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
    });
    this.networksData = this.detailsDataService.getNetworks();
    this.networkColsConfig = this.detailsDataService.getColConfigs();
    this.networksTable = new TableEntryType(
      'default',
      'networksTable',
      this.networksData,
      false,
    );
  }

}
