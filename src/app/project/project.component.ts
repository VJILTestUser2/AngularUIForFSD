import { Component, OnInit } from '@angular/core';

import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Projectdetails} from './projectdetails';
import {ProjectService} from './project.service';
import {Inject} from '@angular/core';
import { UserComponent } from '../user/user.component';
import {Userdetails} from '../user/userdetails';
import { UsersService } from '../user/users.service';
import {Sort} from '@angular/material/sort';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


  show01 : boolean = false;
  show: boolean = true;
  showMsgUP : boolean =false;
  projectForm = new FormGroup({
    projectId : new FormControl('', Validators.required), 
    project: new FormControl('',Validators.required),
    start_date: new FormControl('',Validators.required),
    end_date: new FormControl('',Validators.required),
    priority: new FormControl('',Validators.required),
    //status: new FormControl('',Validators.required)

  
 });
// d = formatDate(new Date(),'dd.M.yyyy','en');
 projectForm01 = new FormGroup({
  projectId : new FormControl('', Validators.required), 
  project: new FormControl('',Validators.required),
  start_date: new FormControl('',Validators.required),
  end_date: new FormControl('',Validators.required),
  priority: new FormControl('',Validators.required),
  notasks : new FormControl('',Validators.required),
  status_count: new FormControl('',Validators.required)
});

 //start_date = new FormControl(new Date());
// serializedDate = new FormControl((new Date()).toISOString());
 d = formatDate(new Date(),'dd.M.yyyy','en');
 d1 = formatDate(new Date(),'MM/dd/yyyy','en');
 allProject: Projectdetails[];
 model :Projectdetails;
 todydate: Date
 articleIdToUpdate = null;
 
 statusCode : number;
 project : String;
 error:any={isError:false,errorMessage:''};
 isValidDate:any;
 start_date : Date;
 end_date : Date;
 project_id : number
 priority : number;
 showMsgfalse =true;
 name: string;
 firstname : string;
 showMsg: boolean = false;
 UpdateMsg : boolean = false;
 deleteMsg : boolean =false;
 showEvent : boolean = false;
 submitted = false;
  constructor(private projectservice : ProjectService, public dialog: MatDialog,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.projectservice.getAllProjectdetails().subscribe(data => this.allProject = data);
   this.projectForm = this.formBuilder.group({
    project: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: ['', [Validators.required, Validators]],
    priority: ['', [Validators.required, Validators]],
    projectId: ['', [Validators.required, Validators]],
    notasks: ['', [Validators.required, Validators]],
    status_count: ['', [Validators.required, Validators]]

});
    
  //  todydate :  this.projectForm.get('start_date').setValue(this.d);
    
  }

  get f() { return this.projectForm.controls; }

  onSubmit(){
    this.submitted = true;
    
            // stop here if form is invalid
            if (this.projectForm.invalid) {
                return;
            }

            alert('PROJECT ADDED SUCCESSFULLY!! :-');
  }

add(){

  
  this.start_date = this.projectForm.get('start_date').value;
  this.end_date = this.projectForm.get('end_date').value;
  this.isValidDate = this.validateDates(this.start_date, this.end_date);
  console.info(this.isValidDate);
  if(this.isValidDate){
    this.isValidDate= false;
    errorCode => this.statusCode = errorCode;
  }


  this.project = this.projectForm.get('project').value;
  this.priority = this.projectForm.get('priority').value;
 
  let projectdetails= new Projectdetails(this.project,this.start_date,this.end_date,this.priority);
 // userdetails.id=null;
  this.projectservice.createProject(projectdetails).subscribe(successCode => {
     this.statusCode = successCode;
     this.projectservice.getAllProjectdetails().subscribe(data => this.allProject = data);
     this.showMsg= true;
},

     errorCode => this.statusCode = errorCode);
}

    validateDates(sDate: Date, eDate: Date){
    this.isValidDate = true;
    if((sDate == null || eDate ==null)){
      this.error={isError:true,errorMessage:'Start date and end date are required.'};
      this.isValidDate = false;
    }

    if((sDate != null && eDate !=null) && (eDate) < (sDate)){
      this.error={isError:true,errorMessage:'End date should be grater then start date.'};
      this.isValidDate = false;
    }
    return this.isValidDate;
  }

 
  updateProject(Projectitem : Projectdetails) {


          let pro : String;
          let std : Date;
          let etd : Date;
          let pri : number;
          this.show = false;
          this.show01 = true;
          let pid : number;

          if(null == this.projectForm01.get('project').value){
            pro = Projectitem.project;
           this.projectForm.get('project').setValue(pro);
          }
          else{
            pro =  this.projectForm.get('project').value;
          //  console.log(f)
          }

          if("" == this.projectForm01.get('priority').value){
            pri = Projectitem.priority;
           this.projectForm.get('priority').setValue(pri);
          }
          else{
            pri =  this.projectForm.get('priority').value;
          //  console.log(f)
          }

          if("" == this.projectForm01.get('start_date').value){
            std = Projectitem.start_date;
           this.projectForm.get('start_date').setValue(std);
          }
          else{
            std =  this.projectForm.get('start_date').value;
          
          }
          
          etd = this.projectForm01.get('end_date').value;     
          if("" == this.projectForm01.get('end_date').value){
                
            etd = Projectitem.end_date;
            this.projectForm.get('end_date').setValue(etd);
               }
          else{
            etd =  this.projectForm.get('end_date').value;
              }
          
           pid = this.projectForm01.get('projectId').value;        
          if("" == this.projectForm01.get('projectId').value){
            pid = Projectitem.projectId;
            this.projectForm.get('projectId').setValue(pid);
          }
           else{
            pid =  this.projectForm.get('projectId').value;
           //  console.log(f)
          }
        
        
          // let p = this.projectForm01.get('priority').value;
              
          }
         
      /*    let updateProject= new Projectdetails(pro,std,etd,pri);
          updateProject.projectId = this.project_id;
         this.projectservice.updateProjectdetails(updateProject)
           .subscribe(successCode => {
               this.statusCode = successCode;
               this.getAllProjectdetails();	
               this.UpdateMsg= true;
              // this.backToCreateArticle();
         },
               errorCode => this.statusCode = errorCode);*/
  
     

     updatePro(){

      let start_date = this.projectForm.get('start_date').value;
      let end_date = this.projectForm.get('end_date').value;
      let project = this.projectForm.get('project').value;
      let priority = this.projectForm.get('priority').value;
      let projectId = this.projectForm.get('projectId').value;

      let projectdetails= new Projectdetails(project,start_date,end_date,priority);
      projectdetails.projectId = projectId;
      this.projectservice.updateProjectdetails(projectdetails).subscribe(successCode => {
         this.statusCode = successCode;
         this.getAllProjectdetails();	
         this.showMsgUP= true;
   },
  
         errorCode => this.statusCode = errorCode);
  } 


     


  checkboxevent(e){
    if(e.target.checked){
      console.info(" Checked..  ");
     
      this.projectForm.get('start_date').enable();
      this.projectForm.get('end_date').enable();
         
    }else{
      this.projectForm.get('start_date').disable();
      this.projectForm.get('end_date').disable();
    }


  }

  

  getAllProjectdetails() {
    this.projectservice.getAllProjectdetails().subscribe(data => this.allProject = data,
      errorCode => this.statusCode = errorCode);
   
  }

  //Delete article
 deleteProject(projectId: number) {
  
  this.projectservice.deleteProjectById(projectId)
    .subscribe(successCode => {
      
      this.getAllProjectdetails();	
      this.deleteMsg = true;
     
   },
   errorCode => this.statusCode = errorCode);    
}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
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

  sortData(sort: Sort) {
    const data = this.allProject.slice();
    if (!sort.active || sort.direction === '') {
      this.allProject = data;
      return;
    }

    this.allProject = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
   /*   let sdate : string;
      let edate : string;
      sdate = a.start_date.toDateString();
      edate = a.end_date.toDateString();*/
      switch (sort.active) {

       
        case 'priority': return compare(a.priority, b.priority, isAsc);     
        default: return 0;
      }
    });
  }
 

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  allUsers:Userdetails[];

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string,public userServices : UsersService) {
     // let fname = data.firstname;
     userServices.getAllUsersdetails().subscribe(data => this.allUsers = data);
  
    }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

  onNoClick01(data01 : UsersService): void {
    
    
  //  data01.getAllUsersdetails().subscribe(data01 => this.allUsers = data01);
  }


}