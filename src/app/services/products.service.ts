import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/Iproduct';
import { IProductDetails } from '../interfaces/IProductDetails';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  public _url=  "http://backend.ashbalalfan.com/api/product"
  //public _url = "assets/data/products.json"
  products:any = [];

  //all products
  GetAllProducts():Observable<IProduct[]>{
    this.products =  this.http.get<IProduct[]>(this._url);
    return this.products;
  }

  //delete a blog (item)
  DeleteProduct(productId:string){
    return this.http.delete(this._url+"/"+productId);
  }

  AddProduct(product:any){
    return this.http.post<IProduct>(this._url,product);
  }

  EditProduct(id:any , product:any){
    return this.http.patch<IProduct>(this._url+"/"+id,product);
  }

  GetProductPricePlane(id:any){
   return  this.http.get<IProductDetails[]>(this._url+"/price-plan/"+id);
  }

  EditProductPricePlane(id:any,productdetails:IProductDetails[]){
    return  this.http.post(this._url+"/price-plan/"+id,productdetails);
   }
 

}
