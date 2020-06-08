import { Component, OnInit, OnDestroy, Input, AfterViewInit, Output, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
    this.createNewScorecardForm.addControl('projectGoal',  new FormControl(null, [Validators.required]));
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

  addOwnerUsers(owners: any[]){
    const selectedOwnersUsers = owners.map((user) => {
      return {
        userId: user.userId,
        userfullName: user.userfullName,
        userEmail: user.userEmail
      }
    });
    this.scorecardCreateService.selectedOwnersUsers$.next(selectedOwnersUsers);
  }

  addPrimeUsers(primes: any[]){
    const selectedPrimeUsers = primes.map((user) => {
      return {
        userId: user.userId,
        userfullName: user.userfullName,
        userEmail: user.userEmail
      }
    });
    const projectGoal = this.createNewScorecardForm.controls.projectGoal.value;
    this.scorecardCreateService.enteredPrjectGoal$.next(projectGoal);

    this.scorecardCreateService.selectedPrimeUsers$.next(selectedPrimeUsers);
  }



  addOtherPrimeUsers(otherPrimes: any[]){
    const selectedOtherPrimeUsers = otherPrimes.map((user) => {
      return {
        userId: user.userId,
        userfullName: user.userfullName,
        userEmail: user.userEmail
      }
    });
    this.scorecardCreateService.selectedOtherPrimeUsers$.next(selectedOtherPrimeUsers);
  }

}
