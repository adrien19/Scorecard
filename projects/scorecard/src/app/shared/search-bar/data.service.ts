import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { IScorecardItem } from '../models/scorecard-item';
import { environment } from 'projects/scorecard/src/environments/environment';
import { tap, shareReplay } from 'rxjs/operators';


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
}
