import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TableLayoutComponent } from './table-layout.component';
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  PercentPipe,
} from '@angular/common';
import { FormatCellPipe } from './table-format-cell.pipe';
import { StyleCellDirective } from './table-style-cell.directive';
import { MaterialModule } from '../shared';

@NgModule({
  declarations: [
    TableLayoutComponent,
    FormatCellPipe,
    StyleCellDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    // HttpClientModule,
    TableLayoutComponent,
    FormatCellPipe,
    StyleCellDirective,
  ],

  providers: [CurrencyPipe, DatePipe, PercentPipe],
})
export class TableLayoutModule {}
