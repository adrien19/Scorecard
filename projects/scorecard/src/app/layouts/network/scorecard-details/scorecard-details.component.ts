import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scorecard-details',
  templateUrl: './scorecard-details.component.html',
  styleUrls: ['./scorecard-details.component.scss']
})
export class ScorecardDetailsComponent implements OnInit, OnDestroy {

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
