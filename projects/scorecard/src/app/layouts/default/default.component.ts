import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Scorecard, IScorecardItem } from '../../shared/models/scorecard-item';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  private readonly publishedScorecardsRefresher$ = new BehaviorSubject<Scorecard[]>(undefined);
  publishedScorecards$ = this.publishedScorecardsRefresher$.pipe(
    switchMap( () => {
      return this.dataService.getPublishedScorecards();
    })
  );

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.publishedScorecardsRefresher$.next(undefined);
  }
}
