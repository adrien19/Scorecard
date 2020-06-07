import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../shared/search-bar/data.service';
import { IScorecardItem } from '../../shared/models/scorecard-item';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit, OnDestroy {

  scorecards: IScorecardItem[];
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
    this.dataService.unSubscribeToAllSearchEvent$.next();
    this.dataService.searchOption = [];
  }

  ngOnInit() {
    this.dataSub = this.dataService.getScorecards().subscribe(scorecards => {
      this.scorecards = scorecards
      this.dataService.scorecardsData = scorecards
      if (!scorecards) {
        console.log("No scorecards returned: ");
      }
      console.log("returned In Network scorecards: ", scorecards);
    });
  }

  onSelectedOption(e) {
    this.getFilteredScorecardList();
  }

  getFilteredScorecardList() {
    if (this.dataService.searchOption.length > 0)
      this.scorecards = this.dataService.filteredListOptions();
    else {
      this.scorecards = this.dataService.scorecardsData;
    }

  }

  onCreateNewScorecard(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }


}
