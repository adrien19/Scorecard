import { User } from './user.model';
// import { Timestamp } from 'rxjs';

export class Task {
    description: string;
    taskStatus: string;
    createdTime: Date;
    assigned: boolean;
    assignedTo?: User[];
    assignedBy?: User;
    statusChangedTime?: Date;

    constructor(description: string, taskStatus: string, createdTime: Date, assigned: boolean){
        this.description = description;
        this.taskStatus = taskStatus;
        this.createdTime = createdTime;
        this.assigned = assigned;
    }
}
