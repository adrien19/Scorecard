import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IScorecardItem } from '../models/scorecard-item';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {


  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  @Input() allScoreCards: IScorecardItem[];
  autoCompleteList: any[]
  searchOption: any[] = [];

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  inputChangedSub: Subscription;


  constructor() { }

  ngOnDestroy(): void {
    if (this.inputChangedSub) {
      this.inputChangedSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.inputChangedSub = this.myControl.valueChanges.subscribe(userInput => {
      if (userInput) {
        this.autoCompleteExpenseList(userInput);
      }
    })
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
    var selectedScorecard = event.source.value;
        if(!selectedScorecard) {
          this.searchOption = [];
        }
        else {
          console.log("not")
          const cardAlreadySelected = this.searchOption.find((scorecard) => {
            return scorecard.id.toLowerCase() === selectedScorecard.id.toLowerCase();
          });
          if (!cardAlreadySelected) {
            this.searchOption.push(selectedScorecard);
            this.onSelectedOption.emit(this.searchOption);
          }else{
            console.log("Scorecard was already selected: ", selectedScorecard);
          }
        }
        this.focusOnPlaceInput();
  }


  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }
}
