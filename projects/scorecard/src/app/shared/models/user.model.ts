import { Scorecard } from './scorecard-item';

export class User {
    userId: string;
    userLoginId: string;
    userEmail:string;
    userFirstName?: string;
    userLastName?: string;
    canEditCard?: Scorecard[];
    canViewCard?: Scorecard[];

    constructor(userId: string, userLoginId: string, userEmail: string){
        this.userId = userId;
        this.userLoginId = userLoginId;
        this.userEmail = userEmail;
    }

    
    // set userFirstName(userFirstName: string) {
    //     this._userFirstName = userFirstName;
    // }

    // set userLastName(userLastName: string) {
    //     this._userLastName = userLastName;
    // }
    
    
    // get userFirstName() : string {
    //     return this._userFirstName;
    // }

    // get userLastName() : string {
    //     return this._userLastName;
    // }
    


}