import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';

//import { catchError } from 'rxjs/operators';    

//import { map } from 'rxjs/operators';

import {Projectdetails } from './projectdetails';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private modals: any[] = [];
  
     

  projectdetail : Projectdetails;
   //URLs for CRUD operations
   addProjectUrl     = "http://localhost:8090/addProject";
   getProjectUrl    ="http://localhost:8090/getallProject";
   deleteProjectUrl = "http://localhost:8090/deleteProject";
   updateProjectUrl = "http://localhost:8090/updateproject";

  constructor(private http:Http) { }

   //Create task article
   createProject(project: Projectdetails):Observable<any> {
     console.log("PROJECT ID" +project.projectId);
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          console.log(options)
          return this.http.post(this.addProjectUrl, project, options)
                 .map(success => success.status)
                 .catch(this.handleError);
      }

    //Fetch all task articles
    getAllProjectdetails(): Observable<Projectdetails[]> {
    
         return this.http.get(this.getProjectUrl)
           .map(this.extractData)
           .catch(this.handleError);  
        //return this.http.get(this.allArticlesUrl).pipe(map((this.extractData)));
    }

    //Delete article	
    deleteProjectById(articleId: number) {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let cpParams = new URLSearchParams();
    //  cpParams.set('employee', articleId+"");			
      let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
      return this.http.delete(`${this.deleteProjectUrl}/${articleId}`, options)
             .map(success => success.status)
             .catch(this.handleError);
        }		

     //Update Users
     updateProjectdetails(Projectarticle : Projectdetails):Observable<any> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: cpHeaders });
            return this.http.put(this.updateProjectUrl, Projectarticle, options)
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
      
        /*  add(modal: any) {
              // add modal to array of active modals
              this.modals.push(modal);
          }
      
          remove(id: string) {
              // remove modal from array of active modals
              this.modals = this.modals.filter(x => x.id !== id);
          }
      
          open(id: string) {
              // open modal specified by id
              let modal: any = this.modals.filter(x => x.id === id)[0];
              modal.open();
          }
      
          close(id: string) {
              // close modal specified by id
              let modal: any = this.modals.filter(x => x.id === id)[0];
              modal.close();
          }*/
  
}
