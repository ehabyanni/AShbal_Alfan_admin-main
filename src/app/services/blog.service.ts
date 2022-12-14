import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlog } from '../interfaces/Iblog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }

  public _url = "http://backend.ashbalalfan.com/api/Blog"
  //public _url= "/assets/data/blogitems.json"
  blog:any = [];

  //all blog items
  GetAllItems():Observable<IBlog[]>{
    this.blog =  this.http.get<IBlog[]>(this._url);
    return this.blog;
  }
  GetAllItemsPagination( page:number,pageSize:number):Observable<IBlog[]>{
    this.blog =  this.http.get<IBlog[]>(this._url+"/page?page="+page+"&pageSize="+pageSize);
    return this.blog;
  }

  //delete a blog (item)
  DeleteItem(blogid:string):Observable<any>{
    return this.http.delete(this._url+"/"+blogid);
  }

  AddItem(blog:any){
    return this.http.post<IBlog>(this._url,blog);
  }

  EditItem(id:any , blog:any){
    return this.http.patch<IBlog>(this._url+"/"+id,blog);
  }

}
