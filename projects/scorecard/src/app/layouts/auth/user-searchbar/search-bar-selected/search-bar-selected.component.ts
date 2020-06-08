import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { User } from 'projects/scorecard/src/app/shared/models/user.model';
import { Subscription } from 'rxjs';
import { IUserHolder } from 'projects/scorecard/src/app/shared/models/scorecard-item';

@Component({
  selector: "app-usersearch-selected",
  template: `
  <mat-chip-list #chipUserList>
      <mat-chip
        style="margin-top: 0.4em;"
        *ngFor="let option of searchOption"
        (removed)="removeOption(option)"
      >
        <span>{{ option.userfullName }}</span>

        <mat-icon matChipRemove>cancel</mat-icon>
      </mat-chip>
  </mat-chip-list>
  `,
  styles: []
})

export class SearchBarSelectedUserComponent implements OnInit, OnDestroy {

  searchOption: IUserHolder[];
  @Input() setSelectedOptions: EventEmitter<any>;
  @Output() removeSelectedOption$ = new EventEmitter<any>();
  setSelectedOptionsSub: Subscription;

  constructor(
  ){}

  ngOnDestroy(): void {
    if (this.setSelectedOptionsSub) {
      this.setSelectedOptionsSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.setSelectedOptionsSub = this.setSelectedOptions.subscribe((options) => {
      this.searchOption = options;
    })
  }


  removeOption(option: any) {
    this.removeSelectedOption$.emit(option);
  }


}
