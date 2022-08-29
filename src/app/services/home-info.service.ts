import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HomeInfoService {

  constructor(private http:HttpClient) { }
  public _url:string="http://backend.ashbalalfan.com/api/HomeInfo/admin"

  getHomeInfo(){
    return this.http.get(this._url);
  }

}
