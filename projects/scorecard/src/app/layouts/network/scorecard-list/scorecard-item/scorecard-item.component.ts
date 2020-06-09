import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IScorecardItem, IUserHolder } from 'projects/scorecard/src/app/shared/models/scorecard-item';


@Component({
  selector: 'app-scorecard-item',
  templateUrl: './scorecard-item.component.html',
  styleUrls: ['./scorecard-item.component.scss']
})
export class ScorecardItemComponent implements OnInit, OnChanges{

  @Input() scorecard: IScorecardItem;
  @Input() id: number;
  viewCardisDisplay: boolean = false;

  scorecardPrime: IUserHolder;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

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

}
