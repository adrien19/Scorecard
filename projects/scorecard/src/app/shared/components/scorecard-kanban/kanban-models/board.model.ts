import { BoardColumn } from './board-column.model';
import { ProjectRole } from '../../../models/role.model';

export class Board {
  constructor(public name: string, public columns: BoardColumn[], public boardMembers?: ProjectRole[]){}
}
