import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { User } from 'projects/scorecard/src/app/shared/models/user.model';
import { environment } from 'projects/scorecard/src/environments/environment';
import { IUserHolder } from '../../../shared/models/scorecard-item';


@Injectable({
  providedIn: 'root'
})
export class UserSearchBarService {

  constructor(private http: HttpClient) { }

  fetchUserByUsername(username: string): Observable<User[]> {

    const params = new HttpParams().set("username", username);

    return this.http.get<User[]>(`${environment.apiUrl}/users/byUsername`, {params: params}).pipe(
      shareReplay(),
      tap(users => console.log(users)
      )
    );
  }

  fetchUserByName(name: string): Observable<IUserHolder[]> {

    const params = new HttpParams().set("name", name);

    return this.http.get<IUserHolder[]>(`${environment.apiUrl}/users/searcByName`, {params: params}).pipe(
      shareReplay(),
      tap(users => console.log(users)
      )
    );
  }
}
