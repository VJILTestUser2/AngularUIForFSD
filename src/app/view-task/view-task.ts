
export class ViewTask {
buttonLabel: String;
public task_id: number
public parentid: number;
public pid: number;
//public project : String;
//public status: string;
theCheckbox :boolean;
    constructor(
       
      public projectname : String,
       public task: String, 
       public startdate: Date, 
       public enddate: Date,
      public priority: number, 
      public status: string
      ) { 
    }
   
  }