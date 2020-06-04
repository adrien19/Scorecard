import { Component, OnInit, OnDestroy, Input, AfterViewInit, Output, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { scorecardCreateService } from '../scorecard-create.service';

@Component({
  selector: 'app-create-step-one',
  templateUrl: './create-step-one.component.html',
  styleUrls: ['./create-step-one.component.scss']
})
export class CreateStepOneComponent implements OnInit, OnDestroy {

  @Input() createNewScorecardForm: FormGroup;
  projectTitleValueSubscription: Subscription;
  enableNextButton: boolean;
  componentValidSub: Subscription;

  constructor(
    // private ngComponentsNdikuService: NgComponentsNdikuService,
    private scorecardCreateService: scorecardCreateService,
  ) { }

  ngOnDestroy(): void {
    if (this.projectTitleValueSubscription) {
      this.projectTitleValueSubscription.unsubscribe();
    }
    if (this.componentValidSub) {
      this.componentValidSub.unsubscribe();
    }
  }

  ngOnInit(): void {
  }


  addChild(childName: string, childGroup: FormGroup) {
    this.createNewScorecardForm.addControl(childName, childGroup);
  }

  getInputValue(value: string){
    this.scorecardCreateService.enteredProjectTitle$.next(value);
  }

  checkInputValidity(validity: string){
    console.log(`this is validity: ${validity}`);
    if (validity === "VALID") {
      this.enableNextButton = !this.enableNextButton;
    } else {
      this.enableNextButton = !this.enableNextButton;
    }
  }


  // subscribeToProjectTitleValue() {
  //   this.projectTitleValueSubscription = this.ngComponentsNdikuService.inputValueChanged$.subscribe(
  //     (value) => {
  //       console.log(value); // to be deleteed
  //       this.scorecardCreateService.enteredProjectTitle$.next(value);
  //     }
  //   );
  //   this.componentValidSub = this.ngComponentsNdikuService.isComponentValid$.subscribe((status) => {
  //     if (status === "VALID") {
  //       this.enableNextButton = !this.enableNextButton;
  //     } else {
  //       this.enableNextButton = !this.enableNextButton;
  //     }
  //   });
  // }

}
