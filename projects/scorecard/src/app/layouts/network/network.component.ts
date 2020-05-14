import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/search-bar/data.service';
import { IScorecardItem } from '../../shared/models/scorecard-item';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  scorecards: IScorecardItem[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getPosts().subscribe(scorecards => {
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


}
