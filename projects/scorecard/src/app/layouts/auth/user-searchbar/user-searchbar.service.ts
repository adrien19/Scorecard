import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { User } from 'projects/scorecard/src/app/shared/models/user.model';
import { environment } from 'projects/scorecard/src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserSearchBarService {

  constructor(private http: HttpClient) { }

  fetchUserByUsername(username: string): Observable<User[]> {

    let params = new HttpParams().set("username", username);

    return this.http.get<User[]>(`${environment.apiUrl}/users/byUsername`, {params: params}).pipe(
      shareReplay(),
      tap(cards => console.log(cards)
      )
    );
  }

}
