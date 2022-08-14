import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/Iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  public _url= "/assets/data/products.json"
  products:any = [];

  //all products
  GetAllProducts():Observable<IProduct[]>{
    this.products =  this.http.get<IProduct[]>(this._url);
    return this.products;
  }

  //delete a blog (item)
  DeleteProduct(blogid:string){
    return this.http.delete(this._url+"/"+blogid);
  }

  AddProduct(blog:any){
    return this.http.post<IProduct>(this._url,blog);
  }

  EditProduct(id:any , blog:any){
    return this.http.patch<IProduct>(this._url+"/"+id,blog);
  }

}
