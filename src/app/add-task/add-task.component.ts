import { Component, OnInit,Input } from '@angular/core';

import { FormControl, FormBuilder,FormGroup, Validators } from '@angular/forms';
//import {TaskserviceService} from '../view-task/taskservice.service'
//import {ViewTask} from '../view-task/view-task'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';
import { TaskserviceService } from '../view-task/taskservice.service';
import {ProjectService } from  '../project/project.service';
import { Projectdetails } from '../project/projectdetails';
import {Userdetails } from '../user/userdetails';
import { UsersService } from '../user/users.service';
import {ViewTasks} from '../view-task/view-tasks';
import {ViewTask} from '../view-task/view-task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Input() task : ViewTask;

  allArticles: ViewTask[];
  tasks : ViewTask;
 statusCode: number;
 requestProcessing = false;
 articleIdToUpdate = null;
 processValidation = false;
 project :string;
 firstname:string;
 showMsg: boolean = false;
 submitted =false;
 checked : boolean = false;
 theCheckbox = false;
 showMsg01 : boolean = false;
 showMsg02 : boolean = true;
 marked = false;
 //Create form
 articleForm = new FormGroup({

  projectname : new FormControl('',Validators.required),
  task: new FormControl('',Validators.required),
  priority: new FormControl('',Validators.required),
  startdate: new FormControl('',Validators.required),
  enddate: new FormControl('',Validators.required),
  status : new FormControl('',Validators.required)
//  status:new FormControl('',Validators.required)
 });
 
 //Create constructor to get service instance
 constructor(private articleService: TaskserviceService, public dialog: MatDialog,
  private formBuilder: FormBuilder) {
 }
 ngOnInit() {

  this.articleForm = this.formBuilder.group({
    projectname: ['', Validators.required],
    task: ['', Validators.required],
    priority: ['', [Validators.required, Validators]],
    startdate: ['', [Validators.required, Validators]],
    enddate: ['', [Validators.required, Validators]]
});
 }

 get f() { return this.articleForm.controls; }
 
   onSubmit(){
     this.submitted = true;
     
             // stop here if form is invalid
             if (this.articleForm.invalid) {
                 return;
             }
 
             alert('SUCCESS!! :-');
   }
 

 //Fetch all articles
 getAllArticles() {
  this.articleService.getAllArticles().subscribe(data => this.allArticles = data,
    errorCode => this.statusCode = errorCode);
 
}



  //Handle create and update article
 createTask() {

        let pro : String;
        pro = this.project;
        let task = this.articleForm.get('task').value;
        let priority = this.articleForm.get('priority').value;	
        let startdate = this.articleForm.get('startdate').value;	
        let enddate = this.articleForm.get('enddate').value;	 
        let status = "PENDING";	  
       
     //   let article01= new ViewTask(task,priority,startdate,enddate);	  

  if (this.articleIdToUpdate === null) {  
    //Handle create article
    let article= new ViewTask(pro,task,startdate,enddate,priority,status);
  //  article.project = pro;
    this.articleService.createArticle(article)
      .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllArticles();	
          this.backToCreateArticle();
          this.showMsg= true;
    },
          errorCode => this.statusCode = errorCode);
  } 
}

createParentTask(){
  let task = this.articleForm.get('task').value.trim();
  let article= new ViewTasks(task);
  this.articleService.createParentArticle(article)
  .subscribe(successCode => {
      this.statusCode = successCode;
      this.getAllArticles();	
      this.backToCreateArticle();
      this.showMsg= true;
},
      errorCode => this.statusCode = errorCode);
}





/*else {  
       //Handle update article
    let article= new ViewTask(task_id, parentid, task, priority,startdate,enddate);	  
    this.articleService.updateArticle(article)
      .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllArticles();	
          this.backToCreateArticle();
    },
          errorCode => this.statusCode = errorCode);	  
  }
}*/

checkboxevent01(e){
  if(e.target.checked){

    this.articleForm.get('startdate').enable();
    this.articleForm.get('enddate').enable();

  }else{

    this.articleForm.get('startdate').disable();
    this.articleForm.get('enddate').disable();
  }
 
}

checkboxevent(e){
  if(e.target.checked){
    this.showMsg01 = true;
    this.showMsg02 = false;
    this.articleForm.get('startdate').disable();
    this.articleForm.get('enddate').disable();
    this.articleForm.get('priority').disable();
    
  }else{
    this.articleForm.get('startdate').enable();
    this.articleForm.get('enddate').enable();
    this.articleForm.get('priority').enable();
    
  }
}
 //Perform preliminary processing configurations                                  
 preProcessConfigurations() {
  this.statusCode = null;
this.requestProcessing = true;   
}
//Go back from update to create
backToCreateArticle() {
  this.articleIdToUpdate = null;
  this.articleForm.reset();	  
this.processValidation = false;
}

openDialog(): void {
  const dialogRef = this.dialog.open(DialogOverviewExampleDialogTask, {
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
 
openDialogUser(): void {
  const dialogRef = this.dialog.open(DialogOverviewExampleDialogUser, {
    width: '550px',
    height: '250px',
  //  data: this.firstname
  //  data: this.userServices
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed DDD ' + result);
    this.firstname = result;
  });
}

}

@Component({
  selector: 'dialog-overview-example-dialog-task',
  templateUrl: 'dialog-overview-example-dialog-task.html',
})
export class DialogOverviewExampleDialogTask {

  allProject:Projectdetails[];

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogTask>,
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


@Component({
  selector: 'dialog-overview-example-dialog-user',
  templateUrl: 'dialog-overview-example-dialog-user.html',
})
export class DialogOverviewExampleDialogUser {

  allUsers:Userdetails[];

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogUser>,
    @Inject(MAT_DIALOG_DATA) public data: string,public userService : UsersService) {
     // let fname = data.firstname;
     userService.getAllUsersdetails().subscribe(data => this.allUsers = data);
  
    }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

  onNoClick01(data01 : TaskserviceService): void {
    
    
  //  data01.getAllUsersdetails().subscribe(data01 => this.allUsers = data01);
  }
}
