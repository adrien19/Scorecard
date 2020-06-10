import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DataService } from '../../../layouts/network/data.service';

@Component({
  selector: "app-search-selected",
  template: `
  <mat-chip-list #chipList>
      <mat-chip
        style="margin-top: 0.4em;"
        *ngFor="let option of searchOptions"
        (removed)="removeOption(option)"
      >
        <span>{{ option.title }}</span>

        <mat-icon matChipRemove>cancel</mat-icon>
      </mat-chip>
  </mat-chip-list>
  `,
  styles: []
})

export class SearchBarSelectedComponent implements OnInit {

  @Input() searchOptions: any[];
  @Output() matchipRemovedOption = new EventEmitter<any>();

  constructor(
    private dataService: DataService
  ){}

  ngOnInit(): void {
    // this.searchOption = this.dataService.searchOption;
  }


  removeOption(option: any) {
    this.matchipRemovedOption.emit(option);
  }

}
