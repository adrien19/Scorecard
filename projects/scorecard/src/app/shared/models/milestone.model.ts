export class Milestone {
    name: string;
    completePlanedDate: Date;
    completeActualDate: Date;
    percentDone?: number;
    status: string;

    constructor(name: string, completePlanedDate: Date, completeActualDate: Date, status: string){
        this.name = name;
        this.completePlanedDate = completePlanedDate;
        this.completeActualDate = completeActualDate;
        this.status = status;
    }
}
