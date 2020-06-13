import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DataService } from './data.service';
import { IScorecardItem, Scorecard } from '../../shared/models/scorecard-item';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../auth/auth-services/authentication.service';
import { ScorecardItemService } from '../../shared/components/scorecard-collection/scorecard-list/scorecard-item/scorecard-item.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  scorecards: IScorecardItem[];
  unFilteredscorecardsData: IScorecardItem[];
  dataSub: Subscription;

  private readonly myScorecardsRefresher$ = new BehaviorSubject<Scorecard[]>(undefined);
  myScorecardsData$ = this.myScorecardsRefresher$.pipe(
    switchMap( () => {
      const currentUserId = this.authenticationService.userValue.userId;
      return this.dataService.getScorecardsCreatedByCurrentUser(currentUserId);
    })
  );

  constructor(
    private authenticationService: AuthenticationService,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.myScorecardsRefresher$.next(undefined);
  }


}
