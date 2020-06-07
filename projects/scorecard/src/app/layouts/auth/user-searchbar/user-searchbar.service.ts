import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'projects/scorecard/src/app/shared/models/user.model';
import { USERS } from 'projects/scorecard/src/app/shared/fake-data.ts/users.data';
import { environment } from 'projects/scorecard/src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserSearchBarService {

  searchUserOption=[]
  fetchedUserData: any[];

  matchipSelectedUserOption$ = new Subject<any>();
  unSubscribeToAllUserSearchEvent$ = new Subject<any>();

  constructor(private http: HttpClient) { }

  fetchUserByUsername(username: string): Observable<User[]> {

    let params = new HttpParams().set("username", username);

    return this.http.get<User[]>(`${environment.apiUrl}/users/byUsername`, {params: params}).pipe(
      tap(cards => console.log(cards)
      )
    );
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
