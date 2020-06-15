import { User } from './user.model';
import { CommentObject } from '../components/commeting/comment-item/comment-item.component';
import { IUserHolder } from './scorecard-item';
// import { Timestamp } from 'rxjs';

export class Task {
    description: string;
    taskStatus: string;
    createdTime: Date;
    assigned: boolean;
    assignedTo?: IUserHolder[];
    assignedBy?: User;
    statusChangedTime?: Date;
    comments?: CommentObject[];
    detailedDescription?: string;

    constructor(description: string, taskStatus: string, createdTime: Date, assigned: boolean){
        this.description = description;
        this.taskStatus = taskStatus;
        this.createdTime = createdTime;
        this.assigned = assigned;
    }
}
