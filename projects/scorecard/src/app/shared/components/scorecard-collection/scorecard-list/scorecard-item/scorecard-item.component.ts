import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IScorecardItem, IUserHolder } from 'projects/scorecard/src/app/shared/models/scorecard-item';
import { ScorecardItemService } from './scorecard-item.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-scorecard-item',
  templateUrl: './scorecard-item.component.html',
  styleUrls: ['./scorecard-item.component.scss']
})
export class ScorecardItemComponent implements OnInit, OnDestroy ,OnChanges{

  @Input() scorecard: IScorecardItem;
  @Input() id: number;
  viewCardisDisplay: boolean = false;
  showPublishedConfirmation: any;
  setScorecardPublishStateSub: Subscription;

  scorecardPrime: IUserHolder;

  constructor(
    private scorecardItemService: ScorecardItemService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnDestroy(): void {
    if (this.setScorecardPublishStateSub) {
      this.setScorecardPublishStateSub.unsubscribe();
    }
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes.scorecard) {
      this.scorecardPrime = this.scorecard.primes.principal[0];
    }
  }

  ngOnInit() {
  }


  viewScoreCard(){
    this.router.navigate([this.id, 'scorecard-details'], {relativeTo: this.route});
  }

  onPublishSelectedCard(){
    if (!this.scorecard.published) {
      this.setScorecardPublishStateSub = this.scorecardItemService.setScorecardPublishState(this.scorecard.id, "publish").subscribe((returnedData) => {
        console.log(returnedData);
        this.showPublishedConfirmation = returnedData;
      });
    } else {
      this.setScorecardPublishStateSub = this.scorecardItemService.setScorecardPublishState(this.scorecard.id, "revokePublication").subscribe((returnedData) => {
        console.log(returnedData);
        this.showPublishedConfirmation = returnedData;
      });
    }
  }

}
