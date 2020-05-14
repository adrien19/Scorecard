import { User } from './user.model';

export class Role {
    title: string;
    users?: User[];

    constructor(title: string){
        this.title = title;
    }
}
