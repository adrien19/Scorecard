import { Component, OnInit, OnDestroy, Input, AfterViewInit, Output, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { scorecardCreateService } from '../scorecard-create.service';
import { UserSearchBarService } from '../../../../auth/user-searchbar/user-searchbar.service';
import { IUserHolder } from 'projects/scorecard/src/app/shared/models/scorecard-item';

@Component({
  selector: 'app-create-step-one',
  templateUrl: './create-step-one.component.html',
  styleUrls: ['./create-step-one.component.scss']
})
export class CreateStepOneComponent implements OnInit, OnDestroy {

  @Input() createNewScorecardForm: FormGroup;
  projectTitleValueSubscription: Subscription;

  constructor(
    // private ngComponentsNdikuService: NgComponentsNdikuService,
    private scorecardCreateService: scorecardCreateService,
    private userSearchBarService: UserSearchBarService,
  ) { }

  ngOnDestroy(): void {
    if (this.projectTitleValueSubscription) {
      this.projectTitleValueSubscription.unsubscribe();
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

  getInputValue(value: string){
    this.scorecardCreateService.enteredProjectTitle$.next(value);
  }

  addPrimeUsers(){
    const selectedPrimeUsers = this.userSearchBarService.searchUserOption.map((user) => {
      return {
        userId: user.userId,
        userfullName: user.userfullName,
        userEmail: user.userEmail
      }
    });
    this.scorecardCreateService.selectedPrimeUsers$.next(selectedPrimeUsers);
  }

}
