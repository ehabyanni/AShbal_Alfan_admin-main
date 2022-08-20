import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  constructor(private http:HttpClient) { }

  public _url = "http://localhost:5216/api/User"
  
  user:any = [];

  //all blog items
  GetAllItems():Observable<IUser[]>{
    this.user =  this.http.get<IUser[]>(this._url);
    return this.user;
  }
  GetAllItemsPagination( page:number,pageSize:number):Observable<IUser[]>{
    this.user =  this.http.get<IUser[]>(this._url+"/page?page="+page+"&pageSize="+pageSize);
    return this.user;
  }
}
