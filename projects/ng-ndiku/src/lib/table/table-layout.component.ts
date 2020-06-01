import {
  Component,
  Input,
  OnChanges,
  OnInit,
  OnDestroy,
  HostListener,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ColumnSetting, ColumnMap, TableType } from './table-layout-conf.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableInlineEditService } from './inline-editable/table-inline-edit.service';
import { TableEntryType } from './tableEntryType';

@Component({
  selector: 'ndiku-table-layout',
  template: `
    <ng-container [ngSwitch]="table.tableType">
      <table
        class="table"
        [id]="table.tableId"
        *ngSwitchCase="types.DefaultTable"
        (keyup)="onKeyUp($event)"
      >
        <caption *ngIf="caption">
          {{
            caption
          }}
          {{
            '(Default Table)'
          }}
          <span *ngIf="table.inlineEditable">
            <button *ngIf="!editingMode" (click)="onEditTable()">
              <!-- <mat-icon>home</mat-icon> -->
              Edit
            </button>
            <button *ngIf="editingMode" (click)="onSaveTable()">
              <!-- <mat-icon>home</mat-icon> -->
              Save
            </button>
          </span>
        </caption>
        <thead>
          <tr>
            <th *ngFor="let map of columnMaps" style="text-align: left;">
              {{ map.header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let record of table.dataSource; let i = index">
            <ng-container *ngFor="let map of columnMaps; let j = index">
              <td
                *ngIf="!map.editable && !table.inlineEditable"
                [ndikuStyleCell]="{
                  contentType: record[map.access(record)],
                  table: table
                }"
              >
                {{ record[map.access(record)] | formatCell: map.format }}
              </td>

              <td
                *ngIf="map.editable && table.inlineEditable"
                [id]="createCellId(table.tableId, i, j)"
                (mousedown)="onMouseDown(i, j, map.header)"
                (mouseup)="onMouseUp(i, j, map.header)"
                [ndikuStyleCell]="{
                  contentType: record[map.access(record)],
                  table: table,
                  selectCell: { rowId: i, colId: j }
                }"
              >
                {{ record[map.access(record)] | formatCell: map.format }}
                <i></i>
              </td>
            </ng-container>
          </tr>
        </tbody>
      </table>

      <table
        mat-table
        *ngSwitchCase="types.MatTable"
        [dataSource]="table.dataSource"
        class="mat-elevation-z0"
        [id]="table.tableId"
        (keyup)="onKeyUp($event)"
      >
        <caption *ngIf="caption">
          {{
            caption
          }}
          <span *ngIf="table.inlineEditable">
            <button
              mat-icon-button
              color="accent"
              *ngIf="!editingMode"
              (click)="onEditTable()"
            >
              <!-- <mat-icon>home</mat-icon> -->
              Edit
            </button>
            <button
              mat-icon-button
              color="accent"
              *ngIf="editingMode"
              (click)="onSaveTable()"
            >
              <!-- <mat-icon>home</mat-icon> -->
              Save
            </button>
          </span>
        </caption>
        <ng-container
          *ngFor="let map of columnMaps; let j = index"
          matColumnDef="{{ map.header }}"
        >
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            {{ map.header }}
          </th>
          <ng-container *ngIf="!map.editable && !table.inlineEditable">
            <td
              mat-cell
              class="unselected"
              *matCellDef="let record"
              [ndikuStyleCell]="{
                contentType: record[map.access(record)],
                table: table
              }"
            >
              {{ record[map.access(record)] | formatCell: map.format }}
            </td>
          </ng-container>
          <ng-container *ngIf="map.editable && table.inlineEditable">
            <td
              mat-cell
              *matCellDef="let record; let i = index"
              [id]="createCellId(table.tableId, i, j)"
              (mousedown)="onMouseDown(i, j, map.header)"
              (mouseup)="onMouseUp(i, j, map.header)"
              [ndikuStyleCell]="{
                contentType: record[map.access(record)],
                table: table,
                selectCell: { rowId: i, colId: j }
              }"
            >
              {{ record[map.access(record)] | formatCell: map.format }}
              <i></i>
            </td>
          </ng-container>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
      </table>
    </ng-container>
  `,
  styles: [
    `
      table {
        width: 100%;
      }
      .mat-row,
      .mat-header-row {
        display: flex;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        align-items: center;
        min-height: 48px;
        padding: 0 24px;
      }

      .mat-cell,
      .mat-header-cell {
        flex: 1;
        overflow: hidden;
        word-wrap: break-word;
        border-bottom: none;
      }

      /* below adds cursor  */
      .cursor {
        position: relative;
      }
      .cursor i {
        position: absolute;
        width: 1px;
        height: 80%;
        background-color: gray;
        left: 5px;
        top: 10%;
        animation-name: blink;
        animation-duration: 800ms;
        animation-iteration-count: infinite;
        opacity: 1;
      }

      .cursor :focus + i {
        display: none;
      }

      @keyframes blink {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `,
  ],
})
export class TableLayoutComponent implements OnInit, OnChanges, OnDestroy {
  private _CAPTION: string;
  private _SETTINGS: ColumnSetting[];
  private _TABLE: TableEntryType;

  @Input()
  get caption(): string {
    return this._CAPTION;
  }
  set caption(value: string) {
    this._CAPTION = value;
  }

  @Input()
  get settings(): ColumnSetting[] {
    return this._SETTINGS;
  }
  set settings(value: ColumnSetting[]) {
    this._SETTINGS = value;
  }

  @Input()
  get table(): TableEntryType {
    return this._TABLE;
  }
  set table(tableType: TableEntryType) {
    this._TABLE = tableType;
  }

  @Input() enableEdit = false;

  @Output() saveTableButtonClicked: EventEmitter<any> = new EventEmitter();
  @Output() editTableButtonClicked: EventEmitter<any> = new EventEmitter();

  types = TableType;
  columnMaps: ColumnMap[];
  displayedColumns: any[];
  editingMode = false;
  snackBarServiceSub: Subscription;

  constructor(
    public snackBar: MatSnackBar,
    private tableInlineEditService: TableInlineEditService
  ) {}

  ngOnDestroy(): void {
    if (this.snackBarServiceSub) {
      this.snackBarServiceSub.unsubscribe();
    }
  }

  ngOnInit() {
    if (this.table.inlineEditable) {
      this.tableInlineEditService.table = this.table;
      this.handleUnmatchingCellTypes();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.settings) {
      if (this.settings) {
        // when settings provided
        this.columnMaps = this.settings.map((col) => new ColumnMap(col));
      } else {
        // no settings, create column maps with defaults
        this.columnMaps = Object.keys(this.table.dataSource[0]).map((key) => {
          return new ColumnMap({ primaryKey: key });
        });
      }
      this.displayedColumns = this.columnMaps.map((col) => col.header);
    }

    if (changes.enableEdit) {
      if (this.enableEdit) {
        this.onEditTable();
      }else{
        this.onSaveTable();
      }
    }
  }

  handleUnmatchingCellTypes() {
    this.snackBarServiceSub = this.tableInlineEditService.snackBarMessage$.subscribe(
      (receivedSnackBarMessage) => {
        if (receivedSnackBarMessage) {
          const snackBarRef = this.snackBar.open(
            receivedSnackBarMessage.message,
            receivedSnackBarMessage.action,
            { duration: 3000 }
          );
          if (receivedSnackBarMessage.action === 'DISMISS') {
            snackBarRef.afterDismissed().subscribe(() => {
              this.enterKeyPressed();
            });
            snackBarRef.onAction().subscribe(() => {
              this.enterKeyPressed();
            });
          }
        }
      }
    );
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (this.table && this.table.enableEditingMode) {
      event.stopImmediatePropagation();
      this.tableInlineEditService.onKeyUpTable(event);
    }
  }

  onMouseDown(rowId: number, colId: number, cellsType: string): void {
    if (this.table && this.table.enableEditingMode) {
      this.tableInlineEditService.table = this.table;
      this.tableInlineEditService.columnMaps = this.columnMaps;
      this.tableInlineEditService.onMouseDownTable(rowId, colId, cellsType);
    }
  }

  onMouseUp(rowId: number, colId: number, cellsType: string) {
    if (this.table && this.table.enableEditingMode) {
      this.tableInlineEditService.onMouseUpTable(rowId, colId, cellsType);
    }
  }

  createCellId(tableType: any, i: number, j: number): string {
    return `${tableType}${i}${j}`;
  }

  /**
   * @description Enables table editing mode. Emits bindable event
   */
  onEditTable() {
    if (this.table && !this.table.enableEditingMode) {
      this.saveTableButtonClicked.emit(this.table);
      this.editingMode = true;
      this.table.enableEditingMode = true;
    }
  }

  /**
   * @description clears cell/cells selection, disables table editting mode. Emits bindable event with table data.
   */
  onSaveTable() {
    if (this.table && this.table.enableEditingMode) {
      if (this.table.hasBeenEdited) {
        this.editTableButtonClicked.emit(this.table);
      }
      this.table.enableEditingMode = false;
      this.editingMode = false;
      this.enterKeyPressed();
    }
  }

  /**
   * @description Creates a Keyboard event to save or cancel a cell/cells selection
   */
  enterKeyPressed() {
    if (this.table && this.table.enableEditingMode) {
      const keyEventData = { isTrusted: true, key: 'Enter' };
      const keyBoardEvent = new KeyboardEvent('keyup', keyEventData);
      keyBoardEvent.stopImmediatePropagation();
      this.onKeyUp(keyBoardEvent);
    }
  }
}
