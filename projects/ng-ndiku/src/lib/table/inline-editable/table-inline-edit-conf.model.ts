export interface TableMouseEvent {
  rowId: number;
  colId: number;
  cellsType: string;
}

export interface EditedTableCell {
  rowId: number;
  colId: number;
  tableId: string;
  newCellValue: any;
  header: string;
  editedTimestamp: number;
}
