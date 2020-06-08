import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IUserHolder } from 'projects/scorecard/src/app/shared/models/scorecard-item';


@Injectable({ providedIn: 'root' })
export class scorecardCreateService {

  enteredProjectTitle$ = new Subject<string>();
  enteredPrjectGoal$ = new Subject<string>();
  enteredTeamDetails$ = new Subject<string>();
  selectedOwnersUsers$ = new Subject<IUserHolder[]>();
  selectedPrimeUsers$ = new Subject<IUserHolder[]>();
  selectedOtherPrimeUsers$ = new Subject<IUserHolder[]>();

  constructor(){}


}
