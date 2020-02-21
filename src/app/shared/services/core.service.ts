import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private title: Title) {
  }


  public changeTabTitle(title: string) {
    this.title.setTitle(title);
  }

  public convertToFirebaseObj(obj: any) {
    Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
    const o = {};
    Object.keys(obj).map(key => o[key] = obj[key]);
    return obj;
  }

  public handleError(error: any) {
    if (error.headers) {
      const applicationErrors = error.headers.get('Application-Errors');
      if (applicationErrors) {
        // this.notifierService.notify('error', applicationErrors);
        return throwError(applicationErrors);
      }
    }
    const serverError = error.error;
    if (serverError) {
      for (const key in serverError) {
        if (serverError.hasOwnProperty(key)) {
          if (key != 'isTrusted') {
            // this.notifierService.notify('error', serverError[key]);
          }
        }
      }
    }
    return throwError(serverError);
  }

}
