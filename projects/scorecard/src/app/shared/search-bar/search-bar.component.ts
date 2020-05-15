import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { IScorecardItem } from '../models/scorecard-item';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allScoreCards: IScorecardItem[];
  autoCompleteList: any[]
  searchOption: any[];

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getPosts().subscribe(scorecards => {
      this.searchOption = this.dataService.searchOption;
      this.allScoreCards = scorecards

    });

    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    })
  }

  private autoCompleteExpenseList(input) {
    let categoryList = this.filterCategoryList(input);
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val) {
    var categoryList = []
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

  filterScorecardsList(event) {
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


  removeOption(option) {
        
    let index = this.dataService.searchOption.indexOf(option);
    if (index >= 0)
        this.dataService.searchOption.splice(index, 1);
        this.focusOnPlaceInput();

        this.onSelectedOption.emit(this.dataService.searchOption)
}

focusOnPlaceInput() {
  this.autocompleteInput.nativeElement.focus();
  this.autocompleteInput.nativeElement.value = '';
}
}
