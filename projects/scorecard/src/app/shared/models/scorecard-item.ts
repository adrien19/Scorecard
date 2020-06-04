import { User } from './user.model';
import { Role } from './role.model';
import { Task } from './task.model';
import { Network } from './network.model';
import { Measure } from './measure.model';

export enum ProjectStatus {
  IN_PLANNING = "IN PLANNING",
  IN_PROGRESS = "IN PROGRESS",
  ON_HOLD = "ON HOLD",
  CANCELLED = "CANCELLED",
  POSTPONED = "POSTPONED",
}

export interface IScorecardItem {
  id: string;
  title: string;
  owner: User;
  team: Role[];
  goal: string;
  projectStatus: ProjectStatus;
  status: CardRating;
  primes?: {principal?: User[], secondary?: User[]};
  published?: boolean;
  archived?: boolean;
  doneTask?: Task[];
  nextTask?: Task[]
  challenges?: string[];
  milestones?: Network[];
  measures?: Measure[];
  lastUpdated?: Date;
  lastUpdatedBy?: User;
}

export interface CardRating {
  overall: string;
  quality: string;
  time: string;
  cost: string;
}

export class Scorecard implements IScorecardItem {
    id: string;
    title: string;
    status: CardRating;
    owner: User;
    team: Role[];
    goal: string;
    projectStatus: ProjectStatus;
    published?: boolean = false;
    archived?: boolean = false;
    doneTask?: Task[];
    nextTask?: Task[]
    challenges?: string[];
    milestones?: Network[];
    measures?: Measure[];

    private _PRIMES?: {principal?: User[], secondary?: User[]} = {};
    private _TIME_OF_LAST_UPDATED?: Date;
    private _LAST_UPDATED_BY?: User;


    constructor(title: string , cardStatus: CardRating, projectStatus: ProjectStatus ){
      this.title = title;
      this.status = cardStatus;
      this.projectStatus = projectStatus;
    }


    public get primes() : {
      principal?: User[],
      secondary?: User[]
    } {
      return this._PRIMES;
    }
    public set primes(primes:{principal?: User[], secondary?: User[]}) {
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

    public get lastUpdatedBy() : User {
      return this._LAST_UPDATED_BY;
    }
    public set lastUpdatedBy(lastUpdatedBy : User) {
      this._LAST_UPDATED_BY = lastUpdatedBy;
    }
}
