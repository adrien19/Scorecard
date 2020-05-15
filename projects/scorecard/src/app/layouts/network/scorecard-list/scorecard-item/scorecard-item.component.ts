import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IScorecardItem } from 'projects/scorecard/src/app/shared/models/scorecard-item';
import { Subject } from 'rxjs';
import { DataService } from 'projects/scorecard/src/app/shared/search-bar/data.service';


@Component({
  selector: 'app-scorecard-item',
  templateUrl: './scorecard-item.component.html',
  styleUrls: ['./scorecard-item.component.scss']
})
export class ScorecardItemComponent implements OnInit{

  @Input() scorecard: IScorecardItem;
  @Input() id: number;
  viewCardisDisplay: boolean = false;

  
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    
  }


  viewScoreCard(){
    this.router.navigate([this.id, 'scorecard-details'], {relativeTo: this.route});
  }

}
