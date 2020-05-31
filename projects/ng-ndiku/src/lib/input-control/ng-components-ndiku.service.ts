import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgComponentsNdikuService {
  public inputValueChanged$ = new Subject<any>();
}
