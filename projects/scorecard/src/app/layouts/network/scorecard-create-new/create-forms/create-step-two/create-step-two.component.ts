import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { scorecardCreateService } from '../scorecard-create.service';

@Component({
  selector: 'app-create-step-two',
  templateUrl: './create-step-two.component.html',
  styleUrls: ['./create-step-two.component.scss']
})
export class CreateStepTwoComponent implements OnInit, OnDestroy {

  @Input() createNewScorecardForm: FormGroup;
  projectTeamValueSubscription: Subscription;
  enteredProjectTeam: string;

  componentValidSub: Subscription;

  constructor(
    private scorecardCreateService: scorecardCreateService,
  ) {}

  ngOnDestroy(): void {
    if (this.projectTeamValueSubscription) {
      this.projectTeamValueSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

  get formControls (){
    return this.createNewScorecardForm.controls;
  }

  addChild(childName: string, childGroup: FormGroup) {
    this.createNewScorecardForm.addControl(childName, childGroup);
  }

  getInputValue(value: any){
    this.scorecardCreateService.enteredTeamDetails$.next(value);
  }

}
