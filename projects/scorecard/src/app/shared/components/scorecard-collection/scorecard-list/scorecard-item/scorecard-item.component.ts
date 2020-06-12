import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IScorecardItem, IUserHolder } from 'projects/scorecard/src/app/shared/models/scorecard-item';
import { ScorecardItemService } from './scorecard-item.service';
import { Subscription } from 'rxjs';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';
import { SnackbarNotifService } from '../../../snackbar-notification/snackbar-notif.service';


@Component({
  selector: 'app-scorecard-item',
  templateUrl: './scorecard-item.component.html',
  styleUrls: ['./scorecard-item.component.scss']
})
export class ScorecardItemComponent implements OnInit, OnDestroy ,OnChanges{

  @Input() scorecard: IScorecardItem;
  @Input() id: number;
  viewCardisDisplay: boolean = false;
  showPublishedConfirmation: any;
  setScorecardPublishStateSub: Subscription;

  scorecardPrime: IUserHolder;

  constructor(
    private scorecardItemService: ScorecardItemService,
    private confirmationDialogService: ConfirmationDialogService,
    private snackbarNotifService: SnackbarNotifService,
    private router: Router,
  ) { }

  ngOnDestroy(): void {
    if (this.setScorecardPublishStateSub) {
      this.setScorecardPublishStateSub.unsubscribe();
    }
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes.scorecard) {
      this.scorecardPrime = this.scorecard.primes.principal[0];
    }
  }

  ngOnInit() {
  }


  viewScoreCard(){
    this.router.navigate(['network', this.scorecard.id, 'scorecard-details']);
  }

  onChangePublicationState(){
    if (!this.scorecard.published) {
      this.publishSelectedScorecard();
    } else {
      this.revokePublicationOfSelectedScorecard();
    }
  }

  publishSelectedScorecard(){
    this.confirmationDialogService.openConfirmationDialog("Are you sure you want to publish this Scorecard?").subscribe((result) => {
      if (result) {
        this.setScorecardPublishStateSub = this.scorecardItemService.setScorecardPublishState(this.scorecard.id, "publish").subscribe((returnedData) => {
          this.confirmationDialogService.endUserConfirmedSub$.next();
          if (returnedData.taskCompleted) {
            this.snackbarNotifService.openSnackBar({message: "Scorecard successfully published.", className: ["bg-success", "text-white"]});
          }
        });
      }
    });
  }

  revokePublicationOfSelectedScorecard(){
    this.confirmationDialogService.openConfirmationDialog("This Scorecard will be Unpublished. Still want to go ahead?").subscribe((result) => {
      if (result) {
        this.setScorecardPublishStateSub = this.scorecardItemService.setScorecardPublishState(this.scorecard.id, "revokePublication").subscribe((returnedData) => {
          this.confirmationDialogService.endUserConfirmedSub$.next();
          if (returnedData.taskCompleted) {
            this.snackbarNotifService.openSnackBar({message: "Scorecard successfully unpublished.", className: ["bg-success", "text-white"]});
          }
        });
      }
    });
  }

}
