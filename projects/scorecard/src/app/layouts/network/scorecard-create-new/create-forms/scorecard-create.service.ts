import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IUserHolder } from 'projects/scorecard/src/app/shared/models/scorecard-item';


@Injectable({ providedIn: 'root' })
export class scorecardCreateService {

  enteredProjectTitle$ = new Subject<string>();
  enteredTeamDetails$ = new Subject<string>();
  selectedPrimeUsers$ = new Subject<IUserHolder[]>();

  constructor(){}


}
