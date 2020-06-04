import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  enableNextButton:boolean;


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

  addChild(childName: string, childGroup: FormGroup) {
    this.createNewScorecardForm.addControl(childName, childGroup);
  }

  getInputValue(value: any){
    this.scorecardCreateService.enteredTeamDetails$.next(value);
  }

  checkInputValidity(validity: any){
    if (validity === "VALID") {
      this.enableNextButton = !this.enableNextButton;
    } else {
      this.enableNextButton = !this.enableNextButton;
    }
  }

}
