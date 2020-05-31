import { Injectable } from '@angular/core';
import { Network } from '../../../shared/models/network.model';
import { NETWORKS } from '../../../shared/fake-data.ts/network.data';
import { ColumnSetting } from 'projects/ng-ndiku/src/public_api';

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
}
