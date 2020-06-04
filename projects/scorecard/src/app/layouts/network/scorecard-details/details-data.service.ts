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

  getManagementPrimesData(scorecard: Scorecard): ImanagementTableData[] {
    console.log(`${scorecard.primes.principal}`);
    let primesNames: string[];
    let otherPrimesNames: string[];
    if (scorecard.primes.principal) {
      primesNames = scorecard.primes.principal.map((user) => { return user.userfullName});
    }else{
      primesNames = [];
    }
    if (scorecard.primes.secondary) {
      otherPrimesNames = scorecard.primes.secondary.map((user) => { return user.userfullName})
    } else {
      otherPrimesNames = [];
    }

    const MANAGEMEMT_TABLE_DATA: ImanagementTableData[] = [
      {
        prime: primesNames,
        others: otherPrimesNames,
      },
    ];

    // const PRIMES: PrimeRole[] = [{
    //   title: 'prime',
    //   primary: scorecard.primes.principal.map((user) =>{ return user}),
    //   secondary: scorecard.primes.secondary.map((user) =>{ return user})
    // }]
    return MANAGEMEMT_TABLE_DATA;
    // return PRIMES
  }
  getManagementPrimesColConfigs(): ColumnSetting[]{
    const managementPrimesColConfigs: ColumnSetting[] = [
      {
        primaryKey: 'prime',
        header: 'Prime',
        editable: true,
      },
      {
        primaryKey: 'others',
        header: 'Other(s)',
        editable: true,
      }
    ];
    return managementPrimesColConfigs;
  }
}


export interface ImanagementTableData {
  prime: string[];
  others: string[];
}
