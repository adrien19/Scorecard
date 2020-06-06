import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserSearchBarService } from './user-searchbar.service';
import { liveSearch } from './live-searchbar.operator';
import { User } from '../../../shared/models/user.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-searchbar.component.html',
  styleUrls: ['./user-searchbar.component.scss']
})
export class UserSearchBarComponent implements OnInit {
  private userIdSubject = new Subject<string>();

  readonly searchedUsers$ = this.userIdSubject.pipe(
    liveSearch(userId => this.userSearchBarService.fetchUsers(userId))
  );

  myUserInputControl = new FormControl();
  filteredUserOptions: Observable<string[]>;
  allUsers: User[];
  autoCompleteUserList: any[]
  searchUserOption: any[];

  @ViewChild('autocompleteUserInput') autocompleteUserInput: ElementRef;
  @Output() onSelectedUserOption = new EventEmitter();

  constructor(private userSearchBarService: UserSearchBarService) { }


  ngOnInit(): void {
    this.userSearchBarService.matchipSelectedUserOption$.pipe(
      takeUntil(this.userSearchBarService.unSubscribeToAllUserSearchEvent$)
    ).subscribe((option) => {
      this.removeOption(option);
    });
  }

  searchUsers(userId: string) {
    this.userIdSubject.next(userId);
  }

  displayFn(user: User) {
    let k = user ? user.userfullName : user;
    return k;
  }

  filterUsersList(event: any) {
    var selectedUser = event.source.value;
    if(!selectedUser) {
      this.userSearchBarService.searchUserOption=[]
    }
    else {
      console.log("not")
      const userAlreadySelected = this.userSearchBarService.searchUserOption.find((user) => {
        return user.userLoginId.toLowerCase() === selectedUser.userLoginId.toLowerCase();
      });
      if (!userAlreadySelected) {
        this.userSearchBarService.searchUserOption.push(selectedUser);
        this.onSelectedUserOption.emit(this.userSearchBarService.searchUserOption)
      }else{
        console.log(`USER ${ selectedUser } HAS ALREADY BEEN SELECTED`);
      }
    }

    this.focusOnPlaceInput();
  }


  removeOption(option: any) {

    let index = this.userSearchBarService.searchUserOption.indexOf(option);
    if (index >= 0){
      this.userSearchBarService.searchUserOption.splice(index, 1);
      if (this.userSearchBarService.searchUserOption.length === 0) {
        this.focusOnPlaceInput();
      }
      this.onSelectedUserOption.emit(this.userSearchBarService.searchUserOption);
    }
  }

  focusOnPlaceInput() {
    this.autocompleteUserInput.nativeElement.focus();
    this.autocompleteUserInput.nativeElement.value = '';
  }
}
