import { Component, OnInit } from "@angular/core";
import { UserSearchBarService } from '../user-searchbar.service';
import { User } from 'projects/scorecard/src/app/shared/models/user.model';

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

export class SearchBarSelectedUserComponent implements OnInit {

  searchOption: User[]

  constructor(
    private userSearchBarService: UserSearchBarService
  ){}

  ngOnInit(): void {
    this.searchOption = this.userSearchBarService.searchUserOption;
  }


  removeOption(option: any) {
    this.userSearchBarService.matchipSelectedUserOption$.next(option);
  }

}
