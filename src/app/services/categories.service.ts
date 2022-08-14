import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/Icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  public _url= "/assets/data/categories.json";

  category:any = [];

  GetAllCategories():Observable<ICategory[]>{
    this.category = this.http.get<ICategory[]>(this._url);
    return this.category;
  }

}
