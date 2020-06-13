
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Scorecard } from '../../../models/scorecard-item';
import { DataService } from 'projects/scorecard/src/app/shared/services/data.service';
import { ScorecardCollectionService } from '../scorecard-collection.service';

@Injectable({ providedIn: 'root' })
export class ScorecardToViewInDetailsResolver implements Resolve<Scorecard> {

  constructor(
    private scorecardCollectionService: ScorecardCollectionService,
    private dataService: DataService,
  ){}

  resolve(route: ActivatedRouteSnapshot): Observable<Scorecard> | Promise<Scorecard> | Scorecard {
    const id =  route.params['id'];
    if (this.scorecardCollectionService.collectedScorecards) {
      return this.scorecardCollectionService.collectedScorecards.find(scorecard => {
        if (scorecard.id === id) {
          return of(scorecard);
        }
      });
    } else {
      return this.dataService.getScorecardById(route.params['id']);
    }
  }
}
