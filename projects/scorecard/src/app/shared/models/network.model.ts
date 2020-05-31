export class Network {
    name: string;
    completePlanedDate: any;
    completeActualDate?: any;
    percentDone?: number;
    status: string;

    constructor(name: string, completePlanedDate: any, status: string, completeActualDate?: any){
        this.name = name;
        this.completePlanedDate = completePlanedDate;
        this.completeActualDate = completeActualDate;
        this.status = status;
    }
}
