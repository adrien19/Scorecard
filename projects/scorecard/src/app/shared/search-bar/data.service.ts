import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { IScorecardItem } from '../models/scorecard-item';


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
    let scorecardData: IScorecardItem[] = [
      { id: 1, title: 'Communicate to Innovate', owner: 'Jeff M.', prime: 'M.'},
      { id: 2, title: 'New Server Installs', owner: 'Power M.', prime: 'Dave D.'},
      { id: 3, title: 'Software Upgrades NB', owner: 'Kent F.', prime: 'Karl L.'},
      { id: 4, title: 'Lifecycle in NL', owner: 'Mike D.', prime: 'Mic S.'},
      { id: 5, title: 'Applications Development', owner: 'Tylor K.', prime: 'Sis F.'},
      { id: 6, title: 'Netwok Upgrades', owner: 'John P.', prime: 'Doe G.'},
    ];

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