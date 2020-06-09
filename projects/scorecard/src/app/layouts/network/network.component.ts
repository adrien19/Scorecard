import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../shared/search-bar/data.service';
import { IScorecardItem, Scorecard } from '../../shared/models/scorecard-item';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit, OnDestroy {

  scorecards: IScorecardItem[];
  unFilteredscorecardsData: IScorecardItem[];
  searchOptions: IScorecardItem[] = [];
  dataSub: Subscription;

  @Output() removeSearchOption = new EventEmitter<any[]>();

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
    this.dataSub = this.dataService.getScorecards().subscribe(scorecards => {
      this.scorecards = scorecards;
      this.unFilteredscorecardsData = scorecards;
      if (!scorecards) {
        console.log("No scorecards returned: ");
      }
      console.log("returned In Network scorecards: ");
    });
  }

  onSelectedOption(event: any) {
    this.getFilteredScorecardList(event);
  }

  getFilteredScorecardList(selectedScorecards: Scorecard[]) {
      this.searchOptions = selectedScorecards;
      this.scorecards = selectedScorecards;
  }

  removeDeletedSearchOption(option: any){
    let index = this.searchOptions.indexOf(option);
    if (index >= 0){
      this.searchOptions.splice(index, 1);
      // if (this.searchOptions.length === 0) {
      //   this.focusOnPlaceInput();
      // }
      if (this.searchOptions.length === 0) {
        this.scorecards = this.unFilteredscorecardsData;

      }
    }
  }

  onCreateNewScorecard(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }


}
