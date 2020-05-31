import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TableType } from './table-layout-conf.model';
import { Subscription } from 'rxjs';
import { TableEntryType } from './tableEntryType';
import { TableInlineEditService } from './inline-editable/table-inline-edit.service';

@Directive({ selector: '[ndikuStyleCell]' })
export class StyleCellDirective implements OnInit, OnDestroy, OnChanges {
  @Input() ndikuStyleCell: {
    table: TableEntryType;
    contentType: string;
    selectCell?: { rowId: number; colId: number };
  };

  cellsStatesSub: Subscription;
  clearEditedVisualsSub: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private tableInlineEditService: TableInlineEditService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.visualizeEditedCells();
  }

  ngOnDestroy(): void {
    if (this.cellsStatesSub) {
      this.cellsStatesSub.unsubscribe();
    }
    if (this.clearEditedVisualsSub) {
      this.clearEditedVisualsSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.handlestylingUndefinedValues();
    this.visualizeEditedCells();
    this.cellsStatesSub = this.tableInlineEditService.updateCellStyle$.subscribe(
      () => {
        this.handleStylingSelectedCells();
      }
    );
    this.clearEditedVisualsSub = this.tableInlineEditService.clearSavedDataInitiated$.subscribe(
      () => {
        this.visualizeEditedCells();
      }
    );
  }

  /**
   * Styles each cell depending on its value.
   */
  handlestylingUndefinedValues() {
    const types = TableType;
    if (
      this.ndikuStyleCell.contentType === undefined &&
      this.ndikuStyleCell.table.tableType === types.MatTable
    ) {
      this.renderer.setStyle(this.el.nativeElement, 'color', '#dcdcdc');
      // this.renderer.setStyle(this.el.nativeElement, 'text-align', 'center');
    }
    if (
      this.ndikuStyleCell.contentType === undefined &&
      this.ndikuStyleCell.table.tableType === types.DefaultTable
    ) {
      this.renderer.setStyle(this.el.nativeElement, 'color', '#dcdcdc');
      this.renderer.setStyle(this.el.nativeElement, 'text-align', 'center');
    }
    if (
      typeof this.ndikuStyleCell.contentType === 'number' &&
      this.ndikuStyleCell.table.tableType === types.DefaultTable
    ) {
      this.renderer.setStyle(this.el.nativeElement, 'text-align', 'right');
      this.renderer.setStyle(this.el.nativeElement, 'padding-right', '10%');
    }
  }

  /**
   * Adds border to user selected cells
   */
  handleStylingSelectedCells() {
    if (this.ndikuStyleCell.table.inlineEditable) {
      const rowId = this.ndikuStyleCell.selectCell.rowId;
      const colId = this.ndikuStyleCell.selectCell.colId;
      const tableCells = this.ndikuStyleCell.table.tableCellStates
        .tableCellStates;

      if (tableCells[rowId][colId]) {
        this.renderer.setStyle(
          this.el.nativeElement,
          'border',
          '1px solid #698ad8'
        );
        this.renderer.addClass(this.el.nativeElement, 'cursor');
        this.renderer.setStyle(this.el.nativeElement, 'min-height', '22px');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'border', 'none');
        this.renderer.removeClass(this.el.nativeElement, 'cursor');
      }

      this.renderer.setStyle(
        this.el.nativeElement,
        '-webkit-user-select',
        'none'
      ); /* Webkit  */
      this.renderer.setStyle(
        this.el.nativeElement,
        '-moz-user-select',
        'none'
      ); /* Firefox */
      this.renderer.setStyle(
        this.el.nativeElement,
        '-ms-user-select',
        'none'
      ); /* IE 10   */
      this.renderer.setStyle(
        this.el.nativeElement,
        '-o-user-select',
        'none'
      ); /* Currently not supported in Opera but will be soon */
      this.renderer.setStyle(this.el.nativeElement, 'user-select', 'none');
    }
  }

  /**
   * Adds background and border color to edited cells
   */
  visualizeEditedCells() {
    if (this.ndikuStyleCell.table.inlineEditable) {
      const table = this.ndikuStyleCell.table;
      const rowId = this.ndikuStyleCell.selectCell.rowId;
      const colId = this.ndikuStyleCell.selectCell.colId;
      if (table.hasBeenEdited(table.tableId)) {
        const editedCells = table.getEditedCellsByTableId(table.tableId);
        editedCells.map((cell) => {
          if (cell.rowId === rowId && cell.colId === colId) {
            this.renderer.setStyle(
              this.el.nativeElement,
              'border',
              '1px solid #B00020'
            );
            this.renderer.setStyle(
              this.el.nativeElement,
              'background',
              '#FFB74D'
            );
          }
        });
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'border', 'none');
        this.renderer.setStyle(this.el.nativeElement, 'background', 'none');
      }
    }
  }
}
