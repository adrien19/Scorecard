import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgComponentsNdikuService } from 'projects/ng-ndiku/src/public_api';
import { Scorecard } from '../../../shared/models/scorecard-item';


@Component({
    selector: 'ndiku-create-new',
    templateUrl: './scorecard-create-new.component.html',
    styleUrls: ['./scorecard-create-new.component.scss']
})

export class ScorecardCreateNewComponent implements OnInit, OnDestroy, AfterViewInit {


  createNewScorecardForm: FormGroup;
  projectOverviewFormGroup: FormGroup;
  projectTeamFormGroup: FormGroup;

  projectTitleValueSubscription: Subscription;
  enteredProjectTitle: string;
  newScorecard: Scorecard;

  constructor(
    fb: FormBuilder,
    private ngComponentsNdikuService: NgComponentsNdikuService
  ) {
    this.createNewScorecardForm = fb.group({
    });
    this.projectOverviewFormGroup = fb.group({
    });
    this.projectTeamFormGroup = fb.group({
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (this.projectTitleValueSubscription) {
      this.projectTitleValueSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.addChild('projectOverviewFormGroup', this.projectOverviewFormGroup);
    this.addChild('projectTeamFormGroup', this.projectTeamFormGroup);
  }


  addChild(childName: string, childGroup: FormGroup) {
    this.createNewScorecardForm.addControl(childName, childGroup);
  }



}
