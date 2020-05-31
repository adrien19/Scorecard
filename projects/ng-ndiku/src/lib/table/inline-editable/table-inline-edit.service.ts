import { Injectable } from '@angular/core';
import {
  TableMouseEvent,
  EditedTableCell,
} from './table-inline-edit-conf.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ColumnMap } from '../table-layout-conf.model';
import { TableEntryType } from '../tableEntryType';

@Injectable({
  providedIn: 'root',
})
export class TableInlineEditService {
  tableMouseDown: TableMouseEvent;
  tableMouseUp: TableMouseEvent;
  newCellValue = '';
  dataSource$ = new Subject<{ table: TableEntryType }>();
  snackBarMessage$ = new Subject<{ message: string; action: string }>();
  updateCellStyle$ = new Subject<any>();
  clearSavedDataInitiated$ = new Subject<any>();

  table: TableEntryType;
  columnMaps: ColumnMap[];

  constructor(public snackBar: MatSnackBar) {}

  /**
   * @description updates selected cell states
   * Update table's dataSource
   * @param text contains user entered value
   */
  updateSelectedCellsValues(text: string) {
    if (text == null) {
      return;
    }

    if (this.tableMouseDown && this.tableMouseUp) {
      if (this.tableMouseDown.cellsType === this.tableMouseUp.cellsType) {
        const dataCopy = this.table.dataSource.slice();
        let startCol: number;
        let endCol: number;
        let startRow: number;
        let endRow: number;

        if (this.tableMouseDown.colId <= this.tableMouseUp.colId) {
          endCol = this.tableMouseUp.colId;
          startCol = this.tableMouseDown.colId;
        } else {
          endCol = this.tableMouseDown.colId;
          startCol = this.tableMouseUp.colId;
        }

        if (this.tableMouseDown.rowId <= this.tableMouseUp.rowId) {
          startRow = this.tableMouseDown.rowId;
          endRow = this.tableMouseUp.rowId;
        } else {
          endRow = this.tableMouseDown.rowId;
          startRow = this.tableMouseUp.rowId;
        }

        // --Edit cells from the same column
        if (startCol === endCol) {
          for (let i = startRow; i <= endRow; i++) {
            const record = dataCopy[i];
            if (record) {
              dataCopy[i][this.columnMaps[startCol].access(record)] = text;
              const editedCell: EditedTableCell = {
                rowId: i,
                colId: startCol,
                header: this.columnMaps[startCol].header,
                newCellValue: text,
                tableId: this.table.tableId,
                editedTimestamp: +new Date(),
              };
              this.table.saveEditedCell(editedCell);
            } else {
              throw new Error('No record found!');
            }
          }
        } else {
          // --Edit cells starting and ending not on the same column
          for (let i = startRow; i <= endRow; i++) {
            for (let j = startCol; j <= endCol; j++) {
              const record = dataCopy[i];
              if (record) {
                dataCopy[i][this.columnMaps[j].access(record)] = text;
                const editedCell: EditedTableCell = {
                  rowId: i,
                  colId: j,
                  header: this.columnMaps[j].header,
                  newCellValue: text,
                  tableId: this.table.tableId,
                  editedTimestamp: +new Date(),
                };
                this.table.saveEditedCell(editedCell);
              } else {
                throw new Error('No record found!');
              }
            }
          }
        }
        // dataSource = dataCopy;
        this.table.dataSource = dataCopy;
        this.dataSource$.next({ table: this.table });
      } else {
        this.openSnackBar(
          'The selected cells dont have the same type.',
          'DISMISS'
        );
      }
    }
  }

  /**
   * @description updates cell properties of selected cell on mouse pressed
   * @param rowId contains row number
   * @param colId contains column number
   * @param cellsType contains header as string
   */
  onMouseDownTable(rowId: number, colId: number, cellsType: string) {
    this.tableMouseDown = { rowId, colId, cellsType };
  }

  /**
   * @description updates cell properties of selected cell on mouse released
   * @param rowId contains row number
   * @param colId contains column number
   * @param cellsType contains header as string
   */
  onMouseUpTable(rowId: number, colId: number, cellsType: string) {
    this.tableMouseUp = { rowId, colId, cellsType };
    if (this.tableMouseDown) {
      this.newCellValue = '';
      this.updateSelectedCellsState(
        this.tableMouseDown.colId,
        this.tableMouseUp.colId,
        this.tableMouseDown.rowId,
        this.tableMouseUp.rowId
      );
    }
  }

  /**
   * @description Update selectedCols && selectedRows arrays
   * @param mouseDownColId contains column number of selected cell when mouse pressed
   * @param mouseUpColId contains column number of selected cell when mouse released
   * @param mouseDownRowId contains row number of selected cell when mouse pressed
   * @param mouseUpRowId contains row number of selected cell when mouse released
   */
  private updateSelectedCellsState(
    mouseDownColId: number,
    mouseUpColId: number,
    mouseDownRowId: number,
    mouseUpRowId: number
  ) {
    // init selected cells
    this.setSelectedCells(
      this.table.tableCellStates.FIRST_EDITABLE_ROW,
      this.table.tableCellStates.LAST_EDITABLE_ROW,
      this.table.tableCellStates.FIRST_EDITABLE_COL,
      this.table.tableCellStates.LAST_EDITABLE_COL,
      false
    );

    // update selected cells
    let startCol: number;
    let endCol: number;
    let startRow: number;
    let endRow: number;
    if (mouseDownColId <= mouseUpColId) {
      startCol = mouseDownColId;
      endCol = mouseUpColId;
    } else {
      endCol = mouseDownColId;
      startCol = mouseUpColId;
    }

    if (mouseDownRowId <= mouseUpRowId) {
      startRow = mouseDownRowId;
      endRow = mouseUpRowId;
    } else {
      endRow = mouseDownRowId;
      startRow = mouseUpRowId;
    }

    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        this.table.tableCellStates.tableCellStates[i][j] = true;
      }
    }

    this.setSelectedCells(startRow, endRow, startCol, endCol, true);
  }

  /**
   * @description sets selected cell properties
   * @param firstEditableRow contains row number of first selected cell
   * @param lastEditableRow contains row number of last selected cell
   * @param firstEditableCol contains column number of first selected
   * @param lastEditableCol contains column number of last selected cell
   * @param value contains true or false to indicate selected or unselected
   */
  private setSelectedCells(
    firstEditableRow: number,
    lastEditableRow: number,
    firstEditableCol: number,
    lastEditableCol: number,
    value: boolean
  ) {
    for (let i = firstEditableRow; i <= lastEditableRow; i++) {
      for (let j = firstEditableCol; j <= lastEditableCol; j++) {
        this.table.tableCellStates.tableCellStates[i][j] = value;
      }
    }
    this.updateCellStyle$.next(); // sending an event to update the selected cells in directive
  }

  /**
   * @description After the user enters a new value, all selected cells must be updated
   * @param event contains keyboard related event data
   */
  onKeyUpTable(event: KeyboardEvent): void {
    // If no cell is selected then ignore keyUp event

    if (this.tableMouseDown && this.tableMouseUp) {
      if (event.key === 'Delete') {
        this.newCellValue = '';
        this.updateSelectedCellsValues(this.newCellValue);
      } else if (event.key === 'Backspace') {
        // 'delete' key is pressed
        const end: number = this.newCellValue.length - 1;
        this.newCellValue = this.newCellValue.slice(0, end);
        this.updateSelectedCellsValues(this.newCellValue);
      } else if (this.isNotSpecialKeys(event)) {
        // key is not specialKeys
        this.newCellValue += event.key;
        this.updateSelectedCellsValues(this.newCellValue);
      }
      if (event.key === 'Enter') {
        this.setSelectedCells(
          this.table.tableCellStates.FIRST_EDITABLE_ROW,
          this.table.tableCellStates.LAST_EDITABLE_ROW,
          this.table.tableCellStates.FIRST_EDITABLE_COL,
          this.table.tableCellStates.LAST_EDITABLE_COL,
          false
        );
      }
    }
  }

  /**
   * @description returns whether a keyboard key is a special key
   * @param event contains keyboard related event data
   */
  isNotSpecialKeys(event: KeyboardEvent): boolean {
    const specialKeys: string[] = [
      'Enter',
      'PrintScreen',
      'Escape',
      'cControl',
      'NumLock',
      'PageUp',
      'PageDown',
      'End',
      'Home',
      'Insert',
      'ContextMenu',
      'Control',
      'ControlAltGraph',
      'Alt',
      'Meta',
      'Shift',
      'CapsLock',
      'TabTab',
      'ArrowRight',
      'ArrowLeft',
      'ArrowDown',
      'ArrowUp',
      'Pause',
      'ScrollLock',
      'Dead',
      '',
      'F1',
      'F2',
      'F3',
      'F4',
      'F5',
      'F6',
      'F7',
      'F8',
      'F9',
      'F10',
      'F11',
      'F12',
    ];

    return this.indexOfInArray(event.key, specialKeys) === -1;
  }

  /**
   * @description returns an index of item in array
   * @param item contains keyboard key to evaluate
   * @param array contains array of keyboard keys
   */
  indexOfInArray(item: string, array: string[]): number {
    let index = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === item) {
        index = i;
      }
    }
    return index;
  }

  /**
   * @description emits an event to open a snack bar
   * @param message contains a message as a string
   * @param action contains action key as string
   */
  openSnackBar(message: string, action: string) {
    const snackBarMessage = {
      message,
      action,
    };
    this.snackBarMessage$.next(snackBarMessage);
  }
}
