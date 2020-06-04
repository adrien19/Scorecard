import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class scorecardCreateService {

  enteredProjectTitle$ = new Subject<string>();
  enteredTeamDetails$ = new Subject<string>();

  constructor(){}


}
