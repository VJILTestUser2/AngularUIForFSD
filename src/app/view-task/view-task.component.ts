import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';
import { TaskserviceService } from './taskservice.service';
import {Sort} from '@angular/material/sort';
import {ViewTask} from './view-task';
import { dirtyParentQueries } from '@angular/core/src/view/query';
import { DISABLED } from '@angular/forms/src/model';
import {Projectdetails} from '../project/projectdetails';
import { ProjectService } from '../project/project.service';
//import { get } from 'https';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  providers: [TaskserviceService]
  
})
export class ViewTaskComponent implements OnInit{

 //Component properties
 count : number
 parentExample : string = "Hellow Angular 7"
 disablefldset = true;
 task_id : number;
 allArticles: ViewTask[];
 tempArticles: ViewTask[];
 statusCode: number;
 requestProcessing = false;
 UpdateMsg : boolean = false;
 deleteMsg : boolean = false;
 showMsgCMP =false;
 articleIdToUpdate = null;
 processValidation = false;
 buttonLabel = true;
 project :string;
 editsave: String;
 //Create form
 
 articleForm01 = new FormGroup({
  task_id: new FormControl(),
  task: new FormControl(),
  pid : new FormControl(),
 projectname : new FormControl(),
  startdate: new FormControl(),
  enddate: new FormControl(),
  priority: new FormControl(),
  status : new FormControl()
 });
 
 //Create constructor to get service instance
 constructor(private articleService: TaskserviceService, public dialog: MatDialog) {
 }
 //Create ngOnInit() and and load articles
 ngOnInit() {
    this.articleService.getAllArticles().subscribe(data => this.allArticles = data);
  this.editsave = "EDIT";
 }

 //Fetch all taskarticles
 getAllArticles() {
      this.articleService.getAllArticles().subscribe(data => this.allArticles = data,

        errorCode => this.statusCode = errorCode);
     
 }
 /*getAllArticles() {
  
  this.articleService.getAllArticles().subscribe(data =>{
    this.tempArticles =data,
  //  errorCode => this.statusCode = errorCode);
    this.tempArticles.forEach(tempObj => {
      tempObj.buttonLabel="EDIT";
      this.allArticles.push (tempObj)
    });
    

  })
   // errorCode => this.statusCode = errorCode);
 
}*/
 

  
   //Update Task
     
   UpdateTask(item : ViewTask) {
    this.processValidation = true;   
    if (this.articleForm01.invalid) {
         return; //Validation failed, exit from method.
    }   
    //Form is valid, now perform create or update
          this.preProcessConfigurations();
          let pid: number;
          let pri: number; 
          let tid: number;
          let tas : String;
          let sd : Date;
          let ed : Date;
          let pname :String;
       

       this.articleForm01.disable();
        tas = this.articleForm01.get('task').value;
        if(null == this.articleForm01.get('task').value){
          tas = item.task;
         }
        else{
         tas =  this.articleForm01.get('task').value;
        }
        
        pri =  this.articleForm01.get('priority').value;
        if(null == this.articleForm01.get('priority').value){
          pri = item.priority;
         }
        else{
         pri =  this.articleForm01.get('priority').value;
        }

        sd =  this.articleForm01.get('startdate').value;
        if(null == this.articleForm01.get('startdate').value){
          sd = item.startdate;
         }
        else{
         sd =  this.articleForm01.get('startdate').value;
        }

        ed =  this.articleForm01.get('enddate').value;
        if(null == this.articleForm01.get('enddate').value){
          ed = item.enddate;
         }
        else{
         ed =  this.articleForm01.get('enddate').value;
        }

        tid =  this.articleForm01.get('task_id').value;
        if(null == this.articleForm01.get('task_id').value){
          tid = item.task_id;
         }
        else{
          tid =  this.articleForm01.get('task_id').value;
        }

        pname =  this.articleForm01.get('projectname').value;
        if(null == this.articleForm01.get('projectname').value){
          pname = item.projectname;
         }
        else{
          pname =  this.articleForm01.get('projectname').value;
        }

        pid =  this.articleForm01.get('pid').value;
        if(null == this.articleForm01.get('pid').value){
          pid = item.pid;
         }
        else{
          pid =  this.articleForm01.get('pid').value;
        }

        let status = "CMP";
        
          
                let taskdetails= new ViewTask(pname,tas,sd,ed,pri,status);
                taskdetails.task_id = tid;
                taskdetails.pid = pid;
                this.articleService.updateArticle(taskdetails).subscribe(successCode => {
                   this.statusCode = successCode;
                   this.showMsgCMP= true;
             },
            
                   errorCode => this.statusCode = errorCode);

     
     
     }
 

    //Load article by id to edit
    loadArticleToEdit(articleId: string) {
      this.preProcessConfigurations();
      this.articleService.getArticleById(articleId)
        .subscribe(article => {
                this.articleIdToUpdate = article.task_id;   
                this.articleForm01.setValue({ pid : article.parentid, 
                  Task: article.task, priori: article.priority ,Sdate :article.startdate, Edate: article.enddate });
          this.processValidation = true;
          this.requestProcessing = false;   
        },
        errorCode =>  this.statusCode = errorCode);   
   }

   
     //Delete article
     deleteTask(tid: number) {
      
           this.articleService.deleteTaskById(tid)
          .subscribe(successCode => {
            
            this.getAllArticles();	
            this.deleteMsg = true;
          
        },
        errorCode => this.statusCode = errorCode);    
      }


      completetaskEnd(item : ViewTask){

        this.articleForm01.disable();
        let startdate = this.articleForm01.get('startdate').value;
        let enddate = this.articleForm01.get('enddate').value;
        let projectname = this.articleForm01.get('projectname').value;
        let priority = this.articleForm01.get('priority').value;
        let task = this.articleForm01.get('task').value;
        let tid = this.articleForm01.get('task_id').value;
        let status = "CMP";

  
        let taskdetails= new ViewTask(projectname,task,startdate,enddate,priority,status);
        taskdetails.task_id = tid;
        taskdetails.status = status;
        this.articleService.updateArticle(taskdetails).subscribe(successCode => {
           this.statusCode = successCode;
         //  this.showMsgUP= true;
     },
    
           errorCode => this.statusCode = errorCode);
  
      /*console.info(" Checked..  ");
     
      this.articleForm01.get('startdate').disable();
      this.articleForm01.get('enddate').disable();
      this.articleForm01.get('task_id').enable();     
    
      this.articleForm01.get('priority').disable();
      this.articleForm01.get('task').disable();*/
    
    
   // this.articleForm01.disable();
    

   }
  
    
   

//Perform preliminary processing configurations
preProcessConfigurations() {
  this.statusCode = null;
this.requestProcessing = true;   
}
//Go back from update to create
backToCreateArticle() {
  this.articleIdToUpdate = null;
  this.articleForm01.reset();	  
this.processValidation = false;
}
 
  name = 'Angular';

            

  dummy(item : ViewTask){


     if(this.editsave === "EDIT")
     {
      this.editsave ="SAVE";
     }
     else{
      this.editsave= "EDIT";
     }
    console.log("uihjiojokjlkj: "+item);
   }

   


   openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogProject, {
      width: '550px',
      height: '250px',
    //  data: this.firstname
    //  data: this.userServices
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed DDD ' + result);
      this.project = result;
  
    });
  }

  openDialogEdit(id : number): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogEdit, {
      width: '1000px',
      height: '750px',
      data: id
    //  data: this.userServices
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log("project: "+this.project);
      console.log('The dialog was closed DDD ' + result);
      this.project = result;
      this.articleService.getAllArticles().subscribe(data => this.allArticles = data);
      this.articleService.getAllArticles();
  
    });
  }

  sortData(sort: Sort) {
    const data = this.allArticles.slice();
    if (!sort.active || sort.direction === '') {
      this.allArticles = data;
      return;
    }

    this.allArticles = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
   /*   let sdate : string;
      let edate : string;
      sdate = a.start_date.toDateString();
      edate = a.end_date.toDateString();*/
      switch (sort.active) {

       
        case 'priority': return compare(a.priority, b.priority, isAsc);   
        case 'task': return compare(a.task, b.task, isAsc);  
        case 'enddate': return compare(a.enddate, b.enddate, isAsc);  
        default: return 0;
      }
    });
  }
 

}
function compare(a: number | String |Date, b: number | String |Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}









@Component({
  selector: 'dialog-overview-example-dialog-edit',
  templateUrl: 'dialog-overview-example-dialog-edit.html',
})
export class DialogOverviewExampleDialogEdit {

  UpdateMsg = false;
  statusCode : number;
  updateform = new FormGroup({
    task_id: new FormControl(),
   // parentid: new FormControl(),
    task: new FormControl(),
    pid : new FormControl(),
   projectname : new FormControl(),
    startdate: new FormControl(),
    enddate: new FormControl(),
    priority: new FormControl(),
    status : new FormControl()
   });

  alltask:ViewTask[];
   taskall : ViewTask;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogProject>,
    @Inject(MAT_DIALOG_DATA) public data: number,public taskservice : TaskserviceService) {
     // let fname = data.firstname;
     taskservice.getAllArticles().subscribe(d => 
      {
        this.alltask = d;
    const task01 = this.alltask.find(taskall => taskall.task_id === data);
    this.updateform.get('task_id').setValue(task01.task_id);
    this.updateform.get('projectname').setValue(task01.projectname);
    this.updateform.get('pid').setValue(task01.pid);
    this.updateform.get('task').setValue(task01.task);
    this.updateform.get('startdate').setValue(task01.startdate);
    this.updateform.get('enddate').setValue(task01.enddate);
    this.updateform.get('priority').setValue(task01.priority);
    this.updateform.get('status').setValue(task01.status);
  //  task01.projectname
     })
    }

    Updaeclick(): void {
    this.dialogRef.close(this.data);

    
    let tid = this.updateform.get('task_id').value;
    let pname = this.updateform.get('projectname').value;
    let pid1 = this.updateform.get('pid').value;
    let task = this.updateform.get('task').value;
    let priority = this.updateform.get('priority').value;	
    let startdate = this.updateform.get('startdate').value;	
    let enddate = this.updateform.get('enddate').value;	
    let status = this.updateform.get('status').value;	  

    let article= new ViewTask(pname,task,startdate,enddate,priority,status);
    article.pid =pid1;
    article.task_id = tid;
   this.taskservice.updateArticle(article)
      .subscribe(successCode => {
          this.statusCode = successCode;
          //this.getAllArticles();	
         // this.backToCreateArticle();
          this.UpdateMsg = true;
          
          
    },
          errorCode => this.statusCode = errorCode);
    
    
  }

  checkboxevent01(e){

    if(e.target.checked){
      
          this.updateform.get('startdate').enable();
          this.updateform.get('enddate').enable();
      
        }else{
      
          this.updateform.get('startdate').disable();
          this.updateform.get('enddate').disable();
        }

  }

  getAllArticles() {
    this.taskservice.getAllArticles().subscribe(data => this.alltask = data,

      errorCode => this.statusCode = errorCode);
   
}

  preProcessConfigurations() {
    this.statusCode = null;
 
  }
  //Go back from update to create
  backToCreateArticle() {
    
    this.updateform.reset();	  
  
  }


}

  @Component({
    selector: 'dialog-overview-example-dialog-project',
    templateUrl: 'dialog-overview-example-dialog-project.html',
  })
  export class DialogOverviewExampleDialogProject {
  
    allProject:Projectdetails[];
  
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialogProject>,
      @Inject(MAT_DIALOG_DATA) public data: string,public projectService : ProjectService) {
       // let fname = data.firstname;
       projectService.getAllProjectdetails().subscribe(data => this.allProject = data);
    
      }
  
    onNoClick(): void {
      this.dialogRef.close(this.data);
    }
  
    onNoClick01(data01 : TaskserviceService): void {
      
      
    //  data01.getAllUsersdetails().subscribe(data01 => this.allUsers = data01);
    }
  }


