import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Scorecard, CardRating, ProjectStatus } from 'projects/scorecard/src/app/shared/models/scorecard-item';
import { User } from 'projects/scorecard/src/app/shared/models/user.model';
import { SCORECARDS } from 'projects/scorecard/src/app/shared/fake-data.ts/scorecard.data';
import { Router, ActivatedRoute } from '@angular/router';
import { scorecardCreateService } from '../scorecard-create.service';
import { PrimeRole } from 'projects/scorecard/src/app/shared/models/role.model';
import { USERS } from 'projects/scorecard/src/app/shared/fake-data.ts/users.data';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scorecardCreateService: scorecardCreateService,
    ) { }

  ngOnDestroy(): void {
    if (this.scorecardTitleSub) {
      this.scorecardTitleSub.unsubscribe();
    }
    if (this.projectGoalSub) {
      this.projectGoalSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.scorecardTitleSub = this.scorecardCreateService.enteredProjectTitle$.subscribe((title) => {
      this.scorecardTitle = title;
    });

    this.projectGoalSub = this.scorecardCreateService.enteredTeamDetails$.subscribe((goal) => {
      this.projectGoal = goal;
    });
  }

  createScorecard(){
    console.log(this.createNewScorecardForm.controls);

    const cardRating: CardRating = {
      overall: "G",
      quality: "G",
      time: "G",
      cost: "G",
    };
    const projectStatus: ProjectStatus = ProjectStatus.IN_PLANNING;
    const ownerUser = new User (
      'jashlasjhsd',
      'Mike.D',
      'user2@test.com',
      'Mike',
      'D.',
      'Mike D.'
    );

    const primeUser = new User(
      'jsudasflsd',
      'Tylor.P',
      'user8@test.com',
      'Tylor',
      'P.',
      'Tylor P.'
    );

    let newCreatedScorecard = new Scorecard(this.scorecardTitle, cardRating, projectStatus);
    newCreatedScorecard.goal = this.projectGoal;
    newCreatedScorecard.owner = ownerUser;
    newCreatedScorecard.lastUpdatedBy = ownerUser;
    newCreatedScorecard.primes.principal = [primeUser];
    // newCreatedScorecard.primes.secondary = [otherPrimeUser];

    SCORECARDS.push(newCreatedScorecard);
    this.navigateToHomePage();
  }

  navigateToHomePage(){
    this.router.navigate(['network']);
  }

}
