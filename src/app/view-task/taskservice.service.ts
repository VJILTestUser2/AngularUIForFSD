import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';

//import { catchError } from 'rxjs/operators';    

//import { map } from 'rxjs/operators';

import { ViewTask } from  './view-task';
import { ViewTasks } from './view-tasks';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

   //URLs for CRUD operations
   allTaskArticlesUrl = "http://localhost:8090/getAllTasks";
   taskarticleUrl     = "http://localhost:8090/addTasks";
   taskupdateurl      = "http://localhost:8090/updateTask";
   gettaskbyId        = "http://localhost:8090/getTask";
   deleteTaskURL =      "http://localhost:8090/deleteTasks";
   ParentTaskUrl      = "http://localhost:8090/paddTasks";

  constructor(private http:Http) { }

  //Fetch all task articles
  getAllArticles(): Observable<ViewTask[]> {

     return this.http.get(this.allTaskArticlesUrl)
       .map(this.extractData)
       .catch(this.handleError);  
    //return this.http.get(this.allArticlesUrl).pipe(map((this.extractData)));
}

  //Fetch article by id
  getArticleById(articleId: string): Observable<ViewTask> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', articleId);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.gettaskbyId, options)
      .map(this.extractData)
      .catch(this.handleError);
      }	

   //Create task article
   createArticle(article: ViewTask):Observable<any> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          console.log(options)
          return this.http.post(this.taskarticleUrl, article, options)
                 .map(success => success.status)
                 .catch(this.handleError);
      }
    
    //Create ParentArticle
    createParentArticle(article: ViewTasks):Observable<any> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: cpHeaders });
            console.log(options)
            return this.http.post(this.ParentTaskUrl, article, options)
                   .map(success => success.status)
                   .catch(this.handleError);
        } 

   //Delete article	
   deleteTaskById(articleId: number) {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
  //  cpParams.set('employee', articleId+"");			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.delete(`${this.deleteTaskURL}/${articleId}`, options)
           .map(success => success.status)
           .catch(this.handleError);
      }		



  //Update task article
  updateArticle(article: ViewTask):Observable<any> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.taskupdateurl, article, options)
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
      return Observable.throw(error.status);
        }
}
