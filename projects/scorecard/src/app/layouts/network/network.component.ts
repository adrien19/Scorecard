import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DataService } from './data.service';
import { IScorecardItem, Scorecard } from '../../shared/models/scorecard-item';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../auth/auth-services/authentication.service';
import { ScorecardItemService } from '../../shared/components/scorecard-collection/scorecard-list/scorecard-item/scorecard-item.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit, OnDestroy {

  scorecards: IScorecardItem[];
  unFilteredscorecardsData: IScorecardItem[];
  dataSub: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
  }

  ngOnInit() {
    const currentUserId = this.authenticationService.userValue.userId;
    console.log(currentUserId);


    this.dataSub = this.dataService.getScorecardsCreatedByCurrentUser(currentUserId).subscribe(scorecards => {
      this.scorecards = scorecards;
      this.unFilteredscorecardsData = scorecards;
      if (!scorecards) {
        console.log("No scorecards returned: ");
      }
      console.log("returned In Network scorecards: ");
    });
  }


}
