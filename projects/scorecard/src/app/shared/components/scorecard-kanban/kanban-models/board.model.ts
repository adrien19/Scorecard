import { BoardColumn } from './board-column.model';

export class Board {
  constructor(public name: string, public columns: BoardColumn[]){}
}
