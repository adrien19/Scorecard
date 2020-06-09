import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IUserHolder } from 'projects/scorecard/src/app/shared/models/scorecard-item';
import { ProjectRole } from 'projects/scorecard/src/app/shared/models/role.model';


@Injectable({ providedIn: 'root' })
export class scorecardCreateService {

  enteredProjectTitle$ = new Subject<string>();
  enteredPrjectGoal$ = new Subject<string>();
  enteredTeamDetails$ = new Subject<ProjectRole[]>();
  selectedOwnersUsers$ = new Subject<IUserHolder[]>();
  selectedPrimeUsers$ = new Subject<IUserHolder[]>();
  selectedOtherPrimeUsers$ = new Subject<IUserHolder[]>();

  constructor(){}


}
