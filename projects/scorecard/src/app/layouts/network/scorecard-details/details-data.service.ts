import { Injectable } from '@angular/core';
import { Network } from '../../../shared/models/network.model';
import { NETWORKS } from '../../../shared/fake-data.ts/network.data';
import { ColumnSetting } from 'projects/ng-ndiku/src/public_api';
import { CardStatus } from '../../../shared/models/scorecard-item';

@Injectable({ providedIn: 'root' })
export class TableDataService {
  getNetworks(): Network[] {
    // actual implementation would use async method
    return NETWORKS;
  }

  getColConfigs(): ColumnSetting[] {
    const networksTableConfigSettings: ColumnSetting[] = [
      {
        primaryKey: 'name',
        header: 'Name',
        editable: false,
      },
      {
        primaryKey: 'completePlanedDate',
        header: 'Plan',
        format: { formatType: 'date' },
        editable: false,
      },
      {
        primaryKey: 'completeActualDate',
        header: 'Actual',
        format: { formatType: 'date' },
        editable: false,
      },
      {
        primaryKey: 'percentDone',
        header: 'Completed',
        format: { formatType: 'percent' },
        editable: false,
      },
      {
        primaryKey: 'status',
        header: 'Status',
        editable: false,
      },
    ];

    return networksTableConfigSettings;
  }

  getCardOverallStatus(): CardStatus[] {
    // actual implementation would use async method
    return [
      {
        overall: "Y",
        quality: "G",
        time: "R",
        cost: "G",
      }
    ];
  }

  getOverallStatusColConfigs(): ColumnSetting[]{

    const overallStatusColConfigs: ColumnSetting[] = [
      {
        primaryKey: 'overall',
        header: 'Overall',
        editable: true,
      },
      {
        primaryKey: 'quality',
        header: 'Quality',
        editable: true,
      },
      {
        primaryKey: 'time',
        header: 'Time',
        editable: true,
      },
      {
        primaryKey: 'cost',
        header: 'Cost',
        editable: true,
      }
    ];
    return overallStatusColConfigs;
  }
}
