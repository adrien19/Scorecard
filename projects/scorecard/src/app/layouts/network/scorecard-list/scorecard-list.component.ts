import { Component, OnInit, Input } from '@angular/core';
import { IScorecardItem } from '../../../shared/models/scorecard-item';

@Component({
  selector: 'app-scorecard-list',
  templateUrl: './scorecard-list.component.html',
  styleUrls: ['./scorecard-list.component.scss']
})
export class ScorecardListComponent implements OnInit {

  @Input() scorecards: IScorecardItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
