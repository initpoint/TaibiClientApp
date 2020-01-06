import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../confing/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  login(loginModel: any): Observable<any> {
    return this.http.post<any>(Config.Login, loginModel);
  }

  register(registerModel: any): Observable<any> {
    return this.http.post<any>(Config.Register, registerModel);
  }

}
