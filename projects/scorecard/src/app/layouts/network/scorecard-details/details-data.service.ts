import { Injectable } from '@angular/core';
import { Network } from '../../../shared/models/network.model';
import { NETWORKS } from '../../../shared/fake-data.ts/network.data';
import { ColumnSetting } from 'projects/ng-ndiku/src/public_api';
import { Scorecard } from '../../../shared/models/scorecard-item';
import { PrimeRole } from '../../../shared/models/role.model';
import { SCORECARDS } from '../../../shared/fake-data.ts/scorecard.data';
import { Observable, of } from 'rxjs';
// import { PRIMES } from '../../../shared/fake-data.ts/role.data';

@Injectable({ providedIn: 'root' })
export class TableDataService {

  getScorecardData(id: number): Scorecard{
    // actual implementation would use async method
    const requestedScorecard = SCORECARDS[id];
    return requestedScorecard;
  }

  // getNetworks(): Network[] {
  //   // actual implementation would use async method
  //   return NETWORKS;
  // }

  getNetworksColConfigs(): ColumnSetting[] {
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

  getManagementPrimesData(scorecard: Scorecard): PrimeRole[] {
    console.log(`${scorecard.primes.principal}`);

    const PRIMES: PrimeRole[] = [{
      title: 'prime',
      primary: scorecard.primes.principal,
      secondary: scorecard.primes.secondary,
    }]
    return PRIMES;
  }
  getManagementPrimesColConfigs(): ColumnSetting[]{
    const managementPrimesColConfigs: ColumnSetting[] = [
      {
        primaryKey: 'primary',
        header: 'Prime',
        editable: true,
      },
      {
        primaryKey: 'secondary',
        header: 'Other(s)',
        editable: true,
      }
    ];
    return managementPrimesColConfigs;
  }
}
