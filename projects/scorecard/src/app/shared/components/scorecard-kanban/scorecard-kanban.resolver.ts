
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from 'projects/scorecard/src/app/shared/services/data.service';
import { Board } from './kanban-models/board.model';
import { ScorecardCollectionService } from '../scorecard-collection/scorecard-collection.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScorecardKanbanBoardResolver implements Resolve<Board> {

  constructor(
    private scorecardCollectionService: ScorecardCollectionService,
    private dataService: DataService,
  ){}

  resolve(route: ActivatedRouteSnapshot): Observable<Board> | Promise<Board> | Board {
    const id =  route.params['id'];
    if (this.scorecardCollectionService.collectedScorecards) {
      const scorecard = this.scorecardCollectionService.collectedScorecards.find(scorecard => {
        if (scorecard.id === id) {
          return scorecard;
        }
      });

      return of(scorecard.scorecardKanbanBoard);

    } else {
      return this.dataService.getScorecardById(route.params['id']).pipe(map(scorecard => {
        return scorecard.scorecardKanbanBoard;
      }));
    }
  }
}
