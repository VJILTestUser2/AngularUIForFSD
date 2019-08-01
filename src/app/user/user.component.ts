import { Component, OnInit } from '@angular/core';
import {ViewTask} from '../view-task/view-task';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OrderPipe } from 'ngx-order-pipe';
import {Userdetails } from './userdetails';
import { UsersService } from './users.service';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  allUsers: Userdetails[];
  show01 : boolean = false;
  show: boolean = true;
  users : Userdetails;
  statusCode: number;
  showMsg: boolean = false;
  UpdateMsg : boolean =false;
  DeleteMsg : boolean =false;
  fnames: string;
  lname : string;
  emp : number;
  firstname :string;
  lastname : string;
  employee : number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;
  
  order: string = 'firstname';
  orderPipe :  OrderPipe;
  item : Userdetails
  editsave : string = 'ADD USER';
  submitted = false;
  reverse: boolean = false;
  buttonLabel : boolean = true;
  sortedCollection01: Userdetails[];
  selectedFeatures: any = [];
   //Create form
   userForm = new FormGroup({
    id : new FormControl('', Validators.required), 
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    employee: new FormControl('', Validators.required)
  
 });

 userForm01 = new FormGroup({
  id : new FormControl(), 
  firstname: new FormControl(),
  lastname: new FormControl(),
  employee: new FormControl()

});

constructor(private userServices : UsersService, private formBuilder: FormBuilder) {

 
   }

  ngOnInit() {

    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', [Validators.required, Validators]],
      employee: ['', [Validators.required, Validators]]
     
  });

   this.userServices.getAllUsersdetails().subscribe(
      data =>{ this.allUsers = data;
    //  this.allUsers = this.allUsers.slice();
      }
    );
    
   
  }

  getAllArticles() {
    this.userServices.getAllUsersdetails().subscribe(data => this.allUsers = data,
      errorCode => this.statusCode = errorCode);
   
  }

  get f() { return this.userForm.controls; }
  
    onSubmit(){
      this.submitted = true;
        if (this.userForm.invalid) {
                  return;
              }
     //   alert('USRER CREATED SUCCESSFULLY!! :-');
    }

  createUser(){

    this.processValidation = true;   
    
  	   
    let id = this.userForm.get('id').value;
    let fname = this.userForm.get('firstname').value;
    let lname = this.userForm.get('lastname').value;
    let empid = this.userForm.get('employee').value;
    let eid = +empid;
    if (this.articleIdToUpdate === null) {  
    let userdetails= new Userdetails(fname,lname,eid);
    userdetails.id=null;
    this.userServices.createUsers(userdetails).subscribe(successCode => {
       this.statusCode = successCode;
       this.getAllArticles();	
       this.showMsg= true;
 },

       errorCode => this.statusCode = errorCode);
}
   
  }

  reset(){

   this.firstname = "";
   this.lastname = "";
   this.employee = 0;
    
  }

  updateTask(item : Userdetails) {
    this.processValidation = true;   
    if (this.userForm01.invalid) {
         return; //Validation failed, exit from method.
    }   
    //Form is valid, now perform create or update
          this.preProcessConfigurations();
          this.show = false;
          this.show01 = true;
          let e: number; 
          let tid: number;
          let f : string;
          let l : string;
          let ed : String;

         
           if(null == this.userForm01.get('firstname').value){
            this.fnames = item.firstname;
             
           this.userForm.get('firstname').setValue(this.fnames);
          }
          else{
            f =  this.userForm01.get('firstname').value;
            console.log(f)
          }

           this.userForm.get('id').setValue(item.id);
          
           
          if(null == this.userForm01.get('lastname').value){
            this.lname = item.lastname;
            this.userForm.get('lastname').setValue(this.lname);
            
           }
          else{
            l =  this.userForm01.get('lastname').value;
            console.log(l)
          }
  
          if(null == this.userForm01.get('employee').value){
            this.emp = item.employee;
            this.userForm.get('employee').setValue(this.emp);
           }
          else{
           e =  this.userForm01.get('employee').value;
           console.log(e)
          }

     }
     //Delete article
     deleteUsers(empId: number) {
  
       this.userServices.deleteUserById(empId)
      .subscribe(successCode => {
        
        this.getAllArticles();	
        this.DeleteMsg = true;
      
    },
    errorCode => this.statusCode = errorCode);    
  }
     //Update Users
     updateUsers(){

      let fname = this.userForm.get('firstname').value;
      let lname = this.userForm.get('lastname').value;
      let empid = this.userForm.get('employee').value;
      let eid = +empid;
     
      let article= new Userdetails(fname,lname,eid);
       article.id = this.userForm.get('id').value;
      this.userServices.updateUserdetails(article)
        .subscribe(successCode => {
            this.statusCode = successCode;
            this.getAllArticles();	
            this.UpdateMsg = true
           // this.backToCreateArticle();
      },
            errorCode => this.statusCode = errorCode);

     }
 
     //Perform preliminary processing configurations
preProcessConfigurations() {
  this.statusCode = null;
this.requestProcessing = true;   
}



  onClickSubmit() {
    
    console.info(this.userForm.value + " FFFFFFFFFFFFFFF")
   

  }  
 



  sortData(sort: Sort) {
    const data = this.allUsers.slice();
    if (!sort.active || sort.direction === '') {
      this.allUsers = data;
      return;
    }

    this.allUsers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstname': return compare(a.firstname, b.firstname, isAsc);
        case 'lastname': return compare(a.lastname, b.lastname, isAsc);
        case 'employee': return compare(a.employee, b.employee, isAsc);     
        default: return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}




  

