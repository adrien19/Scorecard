import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';


export interface statusData {
  overall: string;
  quality: string;
  time: string;
  cost: string;
}

export interface managementData {
  prime: string;
  other: string[];
}

const STATUS_DATA: statusData[] = [
  {overall: 'Y', quality: 'G', time: 'G', cost: 'G'},
];

const MANAGEMEMT_DATA: managementData[] = [
  {prime: 'Y', other: ['Mike K.', 'John D.']},
];

@Component({
  selector: 'app-scorecard-details',
  templateUrl: './scorecard-details.component.html',
  styleUrls: ['./scorecard-details.component.scss']
})
export class ScorecardDetailsComponent implements OnInit, OnDestroy {

  managementDisplayedColumns: string[] = ['overall', 'quality', 'time', 'cost'];
  managementDataSource = STATUS_DATA;

  statusDisplayedColumns: string[] = ['prime', 'other'];
  statusDataSource = MANAGEMEMT_DATA;

  id: number;
  routeSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    console.log(this.route);
    this.routeSub = this.route.params.subscribe( (params: Params) => {
      this.id = +params['id'];
      console.log(this.id);

    });
  }

}
