import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../shared/search-bar/data.service';
import { IScorecardItem } from '../../shared/models/scorecard-item';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

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
  }

  ngOnInit() {
    this.dataSub = this.dataService.getPosts().subscribe(scorecards => {
      this.scorecards = scorecards
      this.dataService.scorecardsData = scorecards
    });
  }

  onSelectedOption(e) {
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    if (this.dataService.searchOption.length > 0)
      this.scorecards = this.dataService.filteredListOptions();
    else {
      this.scorecards = this.dataService.scorecardsData;
    }

    console.log(this.scorecards)
  }

  onCreateNewScorecard(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }


}
