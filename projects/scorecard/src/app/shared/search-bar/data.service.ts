import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { IScorecardItem } from '../models/scorecard-item';
import { SCORECARDS } from '../fake-data.ts/scorecard.data';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchOption=[]
  scorecardsData: IScorecardItem[];

  constructor(
    private http: HttpClient
  ) { }


  getPosts(): Observable<IScorecardItem[]>{
    let scorecardData: IScorecardItem[] = SCORECARDS;

    // [
    //   { id: 1, title: 'Communicate to Innovate', owner: 'Jeff M.', prime: 'M.'},
    //   { id: 2, title: 'New Server Installs', owner: 'Power M.', prime: 'Dave D.'},
    //   { id: 3, title: 'Software Upgrades NB', owner: 'Kent F.', prime: 'Karl L.'},
    //   { id: 4, title: 'Lifecycle in NL', owner: 'Mike D.', prime: 'Mic S.'},
    //   { id: 5, title: 'Applications Development', owner: 'Tylor K.', prime: 'Sis F.'},
    //   { id: 6, title: 'Netwok Upgrades', owner: 'John P.', prime: 'Doe G.'},
    //   { id: 6, title: 'New Upgrades', owner: 'Chris G.', prime: 'Donny K.'},
    // ];

    return of(scorecardData);
  }

  filteredListOptions() {
    let scorecards = this.scorecardsData;
        let filteredPostsList = [];
        for (let scorecard of scorecards) {
            for (let options of this.searchOption) {
                if (options.title === scorecard.title) {
                  filteredPostsList.push(scorecard);
                }
            }
        }
        console.log(filteredPostsList);
        return filteredPostsList;
  }
}
