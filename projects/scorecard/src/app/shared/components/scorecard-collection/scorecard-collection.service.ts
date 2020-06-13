
import { Injectable } from '@angular/core';
import { Scorecard } from '../../models/scorecard-item';

@Injectable({providedIn: 'root'})
export class ScorecardCollectionService {

  collectedScorecards: Scorecard[];

  constructor() { }

}
