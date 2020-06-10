import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../network/data.service';
import { Subscription } from 'rxjs';
import { Scorecard, IScorecardItem } from '../../shared/models/scorecard-item';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, OnDestroy {
  publishedScorecards: IScorecardItem[];
  unFilteredPublishedScorecardsData: IScorecardItem[];
  dataSub: Subscription;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.dataSub = this.dataService.getPublishedScorecards().subscribe(scorecards => {
      this.publishedScorecards = scorecards;
      this.unFilteredPublishedScorecardsData = scorecards;
      if (!scorecards) {
        console.log("No scorecards returned: ");
      }
      console.log("returned In Network scorecards: ");
    });
  }
}
