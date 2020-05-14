import { User } from './user.model';
import { Timestamp } from 'rxjs';

export class Task {
    description: string;
    taskStatus: string;
    createdTime: Timestamp<string>;
    assignedTo?: User[];
    assignedBy?: User;
    assigned: boolean;
    statusChangedTime?: Timestamp<string>; 

    constructor(description: string, taskStatus: string, createdTime: Timestamp<string>, assigned: boolean){
        this.description = description;
        this.taskStatus = taskStatus;
        this.createdTime = createdTime;
        this.assigned = assigned;
    }
}
