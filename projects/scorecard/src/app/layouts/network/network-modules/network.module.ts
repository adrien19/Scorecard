import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared-modules/shared.module';
import { NetworkComponent } from '../network.component';
import { NetworkRoutingModule } from '../network-modules/network-routing.module';
// import { ScorecardListComponent } from '../scorecard-list/scorecard-list.component';
// import { ScorecardItemComponent } from '../scorecard-list/scorecard-item/scorecard-item.component';
// import { ScorecardDetailsComponent } from '../scorecard-details/scorecard-details.component';
import { NetworkTemplateComponent } from '../network-template/network-template.component';
import { ScorecardCreateNewComponent } from '../scorecard-create-new/scorecard-create-new.component';
import { CreateStepOneComponent } from '../scorecard-create-new/create-forms/create-step-one/create-step-one.component';
import { CreateStepTwoComponent } from '../scorecard-create-new/create-forms/create-step-two/create-step-two.component';
import { CreateStepFinalComponent } from '../scorecard-create-new/create-forms/create-step-final/create-step-final.component';
import { CreateRoleItemComponent } from '../scorecard-create-new/create-forms/create-step-two/create-role-item/create-role-item.component';
import { CreateRoleDialogComponent } from '../scorecard-create-new/create-forms/create-step-two/create-role-item/create-role-dialog.component';
import { ScorecardToViewInDetailsResolver } from '../../../shared/components/scorecard-collection/scorecard-details/scorecard-details.resolver';




@NgModule({
  declarations: [
    NetworkComponent,
    // ScorecardListComponent,
    // ScorecardDetailsComponent,
    // ScorecardItemComponent,
    NetworkTemplateComponent,
    ScorecardCreateNewComponent,
    CreateStepOneComponent,
    CreateStepTwoComponent,
    CreateStepFinalComponent,
    CreateRoleItemComponent, // MAYBE DELETED IF IT DOESN'T PASS TEST!!
    // CreateRoleDialogComponent

  ],

  imports: [
    RouterModule,
    SharedModule,
    NetworkRoutingModule
  ],

  exports: [
    NetworkComponent,
    NetworkTemplateComponent,
    ScorecardCreateNewComponent,
    CreateStepOneComponent,
    CreateStepTwoComponent,
    CreateStepFinalComponent,
    // CreateRoleItemComponent, // MAYBE DELETED IF IT DOESN'T PASS TEST!!
    // CreateRoleDialogComponent
  ],

  entryComponents: [CreateRoleItemComponent],
  providers: [ScorecardToViewInDetailsResolver]
})
export class NetworkModule { }
