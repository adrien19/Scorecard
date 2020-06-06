import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'projects/scorecard/src/app/shared/models/user.model';
import { USERS } from 'projects/scorecard/src/app/shared/fake-data.ts/users.data';


@Injectable({
  providedIn: 'root'
})
export class UserSearchBarService {

  searchUserOption=[]
  fetchedUserData: any[];

  matchipSelectedUserOption$ = new Subject<any>();
  unSubscribeToAllUserSearchEvent$ = new Subject<any>();

  constructor(private http: HttpClient) { }

  fetchUsers(id: string): Observable<User[]> {
    const searchedUsers = USERS.filter((user) => {
      return user.userLoginId === id
    });

    return of(searchedUsers);
  }


  filteredListOptions() {
    let users = this.fetchedUserData;
    let filteredUserList = [];
    for (let user of users) {
        for (let options of this.searchUserOption) {
            if (options.userLoginId === user.userLoginId) {
              filteredUserList.push(user);
            }
        }
    }
    console.log(filteredUserList);
    return filteredUserList;
  }


}
