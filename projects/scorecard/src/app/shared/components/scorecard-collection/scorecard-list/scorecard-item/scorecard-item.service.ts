import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'projects/scorecard/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScorecardItemService {

  changeScorecardStatus$ = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ){}

  setScorecardPublishState(scorecardId: string, publishState: string): Observable<{taskCompleted: boolean,changedTo: string}>{

    console.log(scorecardId, publishState);

    // const params = new HttpParams().set("scorecardId", scorecardId).set("publishState", publishState);
    return this.http.post<any>(`${environment.apiUrl}/scorecards/setPublishState`, { scorecardId, publishState }).pipe(
      // shareReplay()
    );
  }

}
