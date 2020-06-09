import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Scorecard, CardRating, ProjectStatus, IUserHolder } from 'projects/scorecard/src/app/shared/models/scorecard-item';
import { SCORECARDS } from 'projects/scorecard/src/app/shared/fake-data.ts/scorecard.data';
import { Router, ActivatedRoute } from '@angular/router';
import { scorecardCreateService } from '../scorecard-create.service';
import { AuthenticationService } from '../../../../auth/auth-services/authentication.service';
import { ProjectRole } from 'projects/scorecard/src/app/shared/models/role.model';

@Component({
  selector: 'app-create-step-final',
  templateUrl: './create-step-final.component.html',
  styleUrls: ['./create-step-final.component.scss']
})
export class CreateStepFinalComponent implements OnInit, OnDestroy {

  @Input() createNewScorecardForm: FormGroup;
  formSubmitted = false;

  scorecardTitle: string;
  scorecardTitleSub: Subscription;

  projectGoal: string;
  projectGoalSub: Subscription;

  primeUsers: IUserHolder[];
  primeUsersSub: Subscription;

  otherPrimeUsers: IUserHolder[];
  otherPrimeUsersSub: Subscription;

  ownerUsers: IUserHolder[];
  ownerUsersSub: Subscription;

  teamDetails: ProjectRole[];
  teamDetailsSub: Subscription;

  constructor(
    private router: Router,
    private scorecardCreateService: scorecardCreateService,
    private authenticationService: AuthenticationService,
    ) { }

  ngOnDestroy(): void {
    if (this.scorecardTitleSub) {
      this.scorecardTitleSub.unsubscribe();
    }
    if (this.projectGoalSub) {
      this.projectGoalSub.unsubscribe();
    }
    if (this.primeUsersSub) {
      this.primeUsersSub.unsubscribe();
    }
    if (this.ownerUsersSub) {
      this.ownerUsersSub.unsubscribe();
    }
    if (this.otherPrimeUsersSub) {
      this.otherPrimeUsersSub.unsubscribe();
    }
    if(this.teamDetailsSub){
      this.teamDetailsSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.scorecardTitleSub = this.scorecardCreateService.enteredProjectTitle$.subscribe((title) => {
      this.scorecardTitle = title;
    });

    this.projectGoalSub = this.scorecardCreateService.enteredPrjectGoal$.subscribe((goal) => {
      this.projectGoal = goal;
    });

    this.ownerUsersSub = this.scorecardCreateService.selectedOwnersUsers$.subscribe((ownerUsers) => {
      this.ownerUsers = ownerUsers;
    });

    this.primeUsersSub = this.scorecardCreateService.selectedPrimeUsers$.subscribe((primeUsers) => {
      this.primeUsers = primeUsers;
    });

    this.otherPrimeUsersSub = this.scorecardCreateService.selectedOtherPrimeUsers$.subscribe((otherPrimeUsers) => {
      this.otherPrimeUsers = otherPrimeUsers;
    });

    this.teamDetailsSub = this.scorecardCreateService.enteredTeamDetails$.subscribe((teamDetails) => {
      this.teamDetails = teamDetails;
    });


  }

  createScorecard(){

    const cardRating: CardRating = {
      overall: "G",
      quality: "G",
      time: "G",
      cost: "G",
    };

    const projectStatus: ProjectStatus = ProjectStatus.IN_PLANNING;
    const currentUser = this.authenticationService.userValue;
    const createdBy: IUserHolder = {
      userId: currentUser.userId,
      userEmail: currentUser.userEmail,
      userfullName: currentUser.userfullName
    }

    let newCreatedScorecard = new Scorecard(this.scorecardTitle, cardRating, projectStatus);
    newCreatedScorecard.goal = this.projectGoal;
    newCreatedScorecard.owner = this.ownerUsers[0];
    newCreatedScorecard.lastUpdatedBy = createdBy;
    newCreatedScorecard.primes.principal = this.primeUsers;
    newCreatedScorecard.primes.secondary = this.otherPrimeUsers;
    newCreatedScorecard.team = this.teamDetails;

    SCORECARDS.push(newCreatedScorecard);
    this.navigateToHomePage();
  }

  navigateToHomePage(){
    this.router.navigate(['network']);
  }

}
