import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';

//import { catchError } from 'rxjs/operators';    

//import { map } from 'rxjs/operators';

import {Userdetails } from './userdetails';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userdetail : Userdetails;
   //URLs for CRUD operations
   addUserUrl     = "http://localhost:8090/addUser";
   getUsersUrl    ="http://localhost:8090/getallUsers";
   deleteUserUrl  = "http://localhost:8090/deleteUser";
   updateUsersUrl = "http://localhost:8090/updateusers";
   

  constructor(private http:Http) { }

   //Create task article
   createUsers(user: Userdetails):Observable<any> {
     console.log("USER ID" +user.id);
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          console.log(options)
          return this.http.post(this.addUserUrl, user, options)
                 .map(success => success.status)
                 .catch(this.handleError);
      }

    //Fetch all task articles
    getAllUsersdetails(): Observable<Userdetails[]> {
    
         return this.http.get(this.getUsersUrl)
           .map(this.extractData)
           .catch(this.handleError);  
        //return this.http.get(this.allArticlesUrl).pipe(map((this.extractData)));
    }

    //Update Users
    updateUserdetails(article : Userdetails):Observable<any> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: cpHeaders });
            return this.http.put(this.updateUsersUrl, article, options)
                   .map(success => success.status)
                   .catch(this.handleError);
        }
    //Delete article	
    deleteUserById(articleId: number) {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let cpParams = new URLSearchParams();
    //  cpParams.set('employee', articleId+"");			
      let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
      return this.http.delete(`${this.deleteUserUrl}/${articleId}`, options)
             .map(success => success.status)
             .catch(this.handleError);
        }		



      private extractData(res: Response) {
        //  let body = res.json();
          return res.text() ? res.json() : {};
            //   return body;
          }
      
        private handleError (error: Response | any) {
          console.error(error.message || error);
            return Observable.throw(error)
        }
      
  
  
}
