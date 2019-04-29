import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { LoginResultModel } from "./model/LoginResultModel";

const reqresUrl = 'https://reqres.in/api/';

@Injectable({
  providedIn: 'root'
})
export class ReqresService {


  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getUsers(page): Observable<any> {
    return this.http.get(reqresUrl + 'users', {params: {'page' : page}})
    .pipe(
      map(this.extractData),
      catchError(this.errorHandler)
    );
  }

  getSingleUser(id): Observable<any> {
    return this.http.get(reqresUrl + 'users/' + id)
    .pipe(
      map(this.extractData),
      catchError(this.errorHandler)
    );
  }

  deleteSingleUser(id): Observable<any> {
    return this.http.delete(reqresUrl + 'users/' + id)
    .pipe(
      tap(_ => console.log(`deleted user id=${id}`)),
      catchError(this.errorHandler)
    );
  }

  addSingleUser(form): Observable<any> {
    return this.http.post(reqresUrl + 'users', form).pipe(
      tap(_ => console.log(`added user with name=${form.name}`)),
      catchError(this.errorHandler)
    );
  }

  login(email:string, password: string): Observable<LoginResultModel>{
    return this.http.post<LoginResultModel>(reqresUrl + 'login',{
      email: email,
      password: password
    });
  }

  private errorHandler(errorResponse: HttpErrorResponse){
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.')
  }

}



