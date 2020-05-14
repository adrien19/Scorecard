import { Component, OnInit, Input } from '@angular/core';
import { IScorecardItem } from 'projects/scorecard/src/app/shared/models/scorecard-item';

@Component({
  selector: 'app-scorecard-item',
  templateUrl: './scorecard-item.component.html',
  styleUrls: ['./scorecard-item.component.scss']
})
export class ScorecardItemComponent implements OnInit {

  @Input() scorecard: IScorecardItem;
  
  constructor() { }

  ngOnInit(): void {
  }

}
