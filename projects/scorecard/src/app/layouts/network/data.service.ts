import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { IScorecardItem } from '../../shared/models/scorecard-item';
import { environment } from 'projects/scorecard/src/environments/environment';
import { tap, shareReplay } from 'rxjs/operators';
import { ProjectRole } from '../../shared/models/role.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }


  getScorecards(): Observable<IScorecardItem[]>{
    return this.http.get<IScorecardItem[]>(`${environment.apiUrl}/all/scorecards`).pipe(
      shareReplay()
    );
  }
  getPublishedScorecards(): Observable<IScorecardItem[]>{

    return this.http.get<IScorecardItem[]>(`${environment.apiUrl}/scorecards/published`).pipe(
      // shareReplay()
    );
  }

  getScorecardsCreatedByCurrentUser(userId: string): Observable<IScorecardItem[]>{

    const params = new HttpParams().set("userId", userId);
    return this.http.get<IScorecardItem[]>(`${environment.apiUrl}/users/myScorecards`, {params: params}).pipe(
      // shareReplay()
    );
  }

  uploadEditedProjectRoles(scorecardId: string, projectRoles: ProjectRole[]): Observable<{taskCompletion: boolean}>{

    return this.http.post<{taskCompletion: boolean}>(`${environment.apiUrl}/scorecards/edit/scorecard/team`, { scorecardId, projectRoles}).pipe(
      // shareReplay()
    );
  }


}
