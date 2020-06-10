import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scorecard-collection',
  templateUrl: './scorecard-collection.component.html',
  styleUrls: ['./scorecard-collection.component.scss']
})
export class ScorecardCollectionComponent implements OnInit, OnDestroy {

  @Input() scorecards: any[];
  @Input() unFilteredscorecardsData: any[];
  searchOptions: any[] = [];
  dataSub: Subscription;

  @Output() removeSearchOption = new EventEmitter<any[]>();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
  }

  ngOnInit() {
  }

  onSelectedOption(event: any) {
    this.getFilteredScorecardList(event);
  }

  getFilteredScorecardList(selectedScorecards: any[]) {
      this.searchOptions = selectedScorecards;
      this.scorecards = selectedScorecards;
  }

  removeDeletedSearchOption(option: any){
    let index = this.searchOptions.indexOf(option);
    if (index >= 0){
      this.searchOptions.splice(index, 1);
      if (this.searchOptions.length === 0) {
        this.scorecards = this.unFilteredscorecardsData;

      }
    }
  }

  onCreateNewScorecard(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }


}
