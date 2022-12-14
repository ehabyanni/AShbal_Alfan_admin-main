import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
const AUTH_API = 'http://backend.ashbalalfan.com';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  login(username:string|null,password:string|null):Observable<any>{
    return this.http.post(AUTH_API+"/login" , {
      username: username,
      password: password
    }, httpOptions);
  }
  resetPassword(username:string|null,oldpassword:string|null,newpassword:string|null):Observable<any>{
    return this.http.post(AUTH_API+"/reset_Password" , {
      username: username,
      oldpassword: oldpassword,
      newpassword:newpassword
    }, httpOptions);

    
  }
}
