import { Injectable } from '@angular/core';
import { Network } from '../../../shared/models/network.model';
import { NETWORKS } from '../../../shared/fake-data.ts/network.data';
import { ColumnSetting } from 'projects/ng-ndiku/src/public_api';
import { CardStatus, Scorecard } from '../../../shared/models/scorecard-item';
import { User } from '../../../shared/models/user.model';
import { Role, PrimeRole } from '../../../shared/models/role.model';
import { USERS } from '../../../shared/fake-data.ts/users.data';
import { SCORECARDS } from '../../../shared/fake-data.ts/scorecard.data';
// import { PRIMES } from '../../../shared/fake-data.ts/role.data';

@Injectable({ providedIn: 'root' })
export class TableDataService {

  getScorecardData(): Scorecard{
    // actual implementation would use async method
    return SCORECARDS[0];
  }

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

  getManagementPrimesData(): PrimeRole[] {
    // actual implementation would use async method
    // const primes = PRIMES.filter(el => {
    //   return el.title === 'prime'
    // });
    // console.log(primes[0].users.length);
    const primeUser: User = USERS.find(el => {return el.userLoginId === 'user1'});
    const otherPrimes:User[] = USERS.filter(el => {return el.userLoginId !== 'user1'});
    const PRIMES: PrimeRole[] = [{
      title: 'prime',
      primary: primeUser,
      secondary: otherPrimes,
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
