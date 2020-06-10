import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared-modules/shared.module';
import { ScorecardCollectionComponent } from '../scorecard-collection.component';
import { ScorecardListComponent } from '../scorecard-list/scorecard-list.component';
import { ScorecardItemComponent } from '../scorecard-list/scorecard-item/scorecard-item.component';
import { ScorecardDetailsComponent } from '../scorecard-details/scorecard-details.component';
import { RouterModule } from '@angular/router';


// @NgModule({
//   declarations: [
//     ScorecardCollectionComponent,
//     ScorecardListComponent,
//     ScorecardItemComponent,
//     ScorecardDetailsComponent,
//   ],

//   imports: [
//     // RouterModule,
//     // SharedModule
//   ],

//   exports: [
//     ScorecardCollectionComponent,
//     ScorecardListComponent,
//     ScorecardItemComponent,
//     ScorecardDetailsComponent,
//   ],

// })

// export class ScorecardCollectionModule { }

export const ScorecardCollectionModule = [
      ScorecardCollectionComponent,
      ScorecardListComponent,
      ScorecardItemComponent,
      ScorecardDetailsComponent,
    ]

