//import { Moment } from 'moment';

export class Projectdetails {

    public projectId : number;
    public notasks : number;
    public status_count : number;
    //startr_date : Date;

    constructor(public project: String, public start_date: Date, 
        public end_date: Date, public priority: number) { 
      }

}
