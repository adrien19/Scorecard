import { User } from './user.model';
import { ProjectRole } from './role.model';
import { Task } from './task.model';
import { Network } from './network.model';
import { Measure } from './measure.model';
import { Board } from '../components/scorecard-kanban/kanban-models/board.model';

export enum ProjectStatus {
  IN_PLANNING = "IN PLANNING",
  IN_PROGRESS = "IN PROGRESS",
  ON_HOLD = "ON HOLD",
  CANCELLED = "CANCELLED",
  POSTPONED = "POSTPONED",
}

export interface IUserHolder {
  userId: string;
  userfullName: string;
  userEmail: string;
}

export interface CardRating {
  overall: string;
  quality: string;
  time: string;
  cost: string;
}

export interface IScorecardItem {
  id: string;
  title: string;
  owner: IUserHolder;
  createdBy: IUserHolder;
  team: ProjectRole[];
  goal: string;
  projectStatus: ProjectStatus;
  status: CardRating;
  primes?: {principal?: IUserHolder[], secondary?: IUserHolder[]};
  published?: boolean;
  archived?: boolean;
  doneTask?: Task[];
  nextTask?: Task[]
  challenges?: string[];
  milestones?: Network[];
  measures?: Measure[];
  lastUpdated?: Date;
  lastUpdatedBy?: IUserHolder;
  scorecardKanbanBoard?: Board;
}


export class Scorecard implements IScorecardItem {
    id: string;
    title: string;
    status: CardRating;
    owner: IUserHolder;
    createdBy: IUserHolder;
    team: ProjectRole[];
    goal: string;
    projectStatus: ProjectStatus;
    published?: boolean = false;
    archived?: boolean = false;
    doneTask?: Task[];
    nextTask?: Task[]
    challenges?: string[];
    milestones?: Network[];
    measures?: Measure[];
    scorecardKanbanBoard?: Board;


    private _PRIMES?: {principal?: IUserHolder[], secondary?: IUserHolder[]} = {};
    private _TIME_OF_LAST_UPDATED?: Date;
    private _LAST_UPDATED_BY?: IUserHolder;

    constructor(title: string , cardStatus: CardRating, projectStatus: ProjectStatus, createdBy: IUserHolder ){
      this.title = title;
      this.status = cardStatus;
      this.projectStatus = projectStatus;
      this.createdBy = createdBy;
    }


    public get primes() : {
      principal?: IUserHolder[],
      secondary?: IUserHolder[]
    } {
      return this._PRIMES;
    }
    public set primes(primes:{principal?: IUserHolder[], secondary?: IUserHolder[]}) {
      if (primes.principal) {
        if (this._PRIMES.principal) {
          const principals = this._PRIMES.principal;
          this._PRIMES.principal = [...principals, ...primes.principal];
        } else {
          this._PRIMES.principal = primes.principal;
        }
      }
      if(primes.secondary){
        if (this._PRIMES.secondary) {
          const secondaries = this._PRIMES.secondary;
          this._PRIMES.secondary = [...secondaries, ...primes.secondary];
        } else {
          this._PRIMES.secondary = primes.secondary;
        }
      }
    }


    public get lastUpdated() : Date {
      return this._TIME_OF_LAST_UPDATED;
    }
    public set lastUpdated(timeOfLastUpdate : Date) {
      this._TIME_OF_LAST_UPDATED = timeOfLastUpdate;
    }

    public get lastUpdatedBy() : IUserHolder {
      return this._LAST_UPDATED_BY;
    }
    public set lastUpdatedBy(lastUpdatedBy : IUserHolder) {
      this._LAST_UPDATED_BY = lastUpdatedBy;
    }
}
