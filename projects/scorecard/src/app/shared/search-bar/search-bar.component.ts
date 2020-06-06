import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { DataService } from './data.service';
import { IScorecardItem } from '../models/scorecard-item';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {


  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allScoreCards: IScorecardItem[];
  autoCompleteList: any[]
  searchOption: any[];

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  inputChangedSub: Subscription;
  chipSelectedOptionSub: Subscription;
  getScorecardsSub: Subscription;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnDestroy(): void {
    if (this.inputChangedSub) {
      this.inputChangedSub.unsubscribe();
    }
    if (this.chipSelectedOptionSub) {
      this.chipSelectedOptionSub.unsubscribe();
    }
    if (this.getScorecardsSub) {
      this.getScorecardsSub.unsubscribe();
    }
  }

  ngOnInit() {

    this.dataService.getScorecards().pipe(
      takeUntil(this.dataService.unSubscribeToAllSearchEvent$)
    ).subscribe(scorecards => {
      this.searchOption = this.dataService.searchOption;
      this.allScoreCards = scorecards;
    });

    this.myControl.valueChanges.pipe(
      takeUntil(this.dataService.unSubscribeToAllSearchEvent$)
    ).subscribe(userInput => {
      if (userInput) {
        this.autoCompleteExpenseList(userInput);
      }
    })

    this.dataService.matchipSelectedOption$.pipe(
      takeUntil(this.dataService.unSubscribeToAllSearchEvent$)
    ).subscribe((option) => {
      this.removeOption(option);
    });
  }

  private autoCompleteExpenseList(input: any) {
    let categoryList = this.filterCategoryList(input);
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val: any) {
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allScoreCards.filter(s => s.title.toLowerCase().indexOf(val.toLowerCase()) != -1)
      : this.allScoreCards;
  }

  displayFn(scorecard: IScorecardItem) {
    let k = scorecard ? scorecard.title : scorecard;
    return k;
  }

  filterScorecardsList(event: any) {
    var scorecards= event.source.value;
        if(!scorecards) {
          this.dataService.searchOption=[]
        }
        else {
          console.log("not")

            this.dataService.searchOption.push(scorecards);
            this.onSelectedOption.emit(this.dataService.searchOption)
        }

        this.focusOnPlaceInput();
  }


  removeOption(option: any) {

    let index = this.dataService.searchOption.indexOf(option);
    if (index >= 0){
      this.dataService.searchOption.splice(index, 1);
      if (this.dataService.searchOption.length === 0) {
        this.focusOnPlaceInput();
      }
      this.onSelectedOption.emit(this.dataService.searchOption);
    }
  }

  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }
}
