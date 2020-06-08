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
    liveSearch(username => this.userSearchBarService.fetchUserByUsername(username))
  );

  myUserInputControl = new FormControl();
  filteredUserOptions: Observable<string[]>;
  allUsers: User[];
  autoCompleteUserList: any[]
  searchUserOption: any[] = [];

  @ViewChild('autocompleteUserInput') autocompleteUserInput: ElementRef;
  @Output() onSelectedUserOption: EventEmitter<any> = new EventEmitter();

  constructor(
    private userSearchBarService: UserSearchBarService,
    ) { }


  ngOnInit(): void {

  }

  searchUsers(username: string) {
    this.userIdSubject.next(username);
  }

  displayFn(user: User) {
    let k = user ? user.userfullName : user;
    return k;
  }

  filterUsersList(event: any) {
    var selectedUser = event.source.value;
    if(!selectedUser) {
      this.searchUserOption=[];
    }
    else {
      console.log("not")
      const userAlreadySelected = this.searchUserOption.find((user) => {
        return user.userId.toLowerCase() === selectedUser.userId.toLowerCase();
      });
      if (!userAlreadySelected) {
        this.searchUserOption.push(selectedUser);
        this.onSelectedUserOption.emit(this.searchUserOption)
      }else{
        console.log(`USER ${ selectedUser } HAS ALREADY BEEN SELECTED`);
      }
    }

    this.focusOnPlaceInput();
  }


  removeOption(option: any) {

    let index = this.searchUserOption.indexOf(option);
    if (index >= 0){
      this.searchUserOption.splice(index, 1);
      if (this.searchUserOption.length === 0) {
        this.focusOnPlaceInput();
      }
      this.onSelectedUserOption.emit(this.searchUserOption);
    }
  }

  focusOnPlaceInput() {
    this.autocompleteUserInput.nativeElement.focus();
    this.autocompleteUserInput.nativeElement.value = '';
  }

}
