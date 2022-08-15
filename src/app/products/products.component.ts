import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from '../interfaces/Icategory';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productservice:ProductsService ,
    private categservice:CategoriesService,
     private router:Router) { }

  products: any = [];
  categories:ICategory[]=[];
  ngOnInit(): void {
    //Fill Products
    this.productservice.GetAllProducts().subscribe(
      data => {
        this.products = data;
      }
    )
    //Fill Category
    this.categservice.GetAllCategories().subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
      }
    )

  }

  DeleteThisProduct(id: any) {
    this.productservice.DeleteProduct(id).subscribe(
      () => {
        this.ngOnInit();
      }
    );
    console.log(id + "deleted");
  }

  goToProductEditor(id: any) {
    //navigate to product editor
    this.router.navigate(['/home/edit-product', id]);
    console.log(id);
  }
  getCategoryName(id:string):any{
    return this.categories.find(c=>c.id==id)?.name;
  }
  
}
