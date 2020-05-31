import { User } from './user.model';
import { Role } from './role.model';
import { Task } from './task.model';
import { Network } from './network.model';
import { Measure } from './measure.model';

export interface IScorecardItem {
    id: number;
    title: string;
    owner: string;
    prime: string;
}

export interface CardStatus {
    status: string;
    statusValue: number;
}

export class Scorecard {
    id: string;
    title: string;
    status: CardStatus[];
    owner: User;
    prime: User;
    team: Role[];
    goal: string;
    published?: boolean = false;
    archived?: boolean = false;
    doneTask?: Task[];
    nextTask?: Task[]
    challenges?: string[];
    milestones?: Network[];
    measures?: Measure[];


    constructor(title: string , cardStatus: CardStatus, prime: User){
        this.title = title;
        this.status.push(cardStatus);
        this.prime = prime;
    }

}
