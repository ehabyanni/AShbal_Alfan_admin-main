import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from '../interfaces/Icategory';
import { IProduct } from '../interfaces/Iproduct';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productservice: ProductsService,
    private categservice: CategoriesService,
    private router: Router) { }

  products: IProduct[] = [];
  categories: ICategory[] = [];

  sortValues: string[] = ["أدني سعر تصاعدي", "أدني سعر تنازلي", "أقصدي سعر تصاعدي", "أقصي سعر تنازلي", "حسب الاسم", "حسب الفئة"];
  showProducts: IProduct[] = [];



  ngOnInit(): void {
    //Fill Products
    this.productservice.GetAllProducts().subscribe(
      data => {
        this.products = data;
        this.showProducts = this.products;
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
        this.products.splice(this.products.findIndex(p => p.id == id), 1);
      }
    );
    console.log(id + "deleted");
  }

  //edit product
  goToProductEditor(id: any) {
    //navigate to product editor
    this.router.navigate(['/home/edit-product', id]);
    console.log(id);
  }

  //get category name
  getCategoryName(id: string): any {
    return this.categories.find(c => c.id == id)?.name;
  }

  //edit price of a product
  goToPriceEditor(id: any) {
    //navigate to product editor
    this.router.navigate(['/home/edit-price', id]);
    console.log(id);
  }


  //sort Function
  showSort(event: any) {
    var sortValueSelected = event.target.value;
    this.showProducts = [...this.products];

    if (sortValueSelected == this.sortValues[0]) {
      this.showProducts.sort((a, b) => a.minPrice - b.minPrice);
    }
    else if (sortValueSelected == this.sortValues[1]) {
      this.showProducts.sort((a, b) => b.minPrice - a.minPrice);
    }
    else if (sortValueSelected == this.sortValues[2]) {
      this.showProducts.sort((a, b) => a.maxPrice - b.maxPrice);

    }
    else if (sortValueSelected == this.sortValues[3]) {
      this.showProducts.sort((a, b) => b.maxPrice - a.maxPrice);
    }
    else if (sortValueSelected == this.sortValues[4]) {
      this.showProducts.sort((a, b) => a.title.localeCompare(b.title));
    }
    else if (sortValueSelected == this.sortValues[5]) {
      this.showProducts.sort((a, b) => a.category_Name.localeCompare(b.category_Name));
    }
    else {
      this.showProducts = this.products;
    }
  }


  //search function
  search(event: any) {
    var searchWord = event.target.value;
    console.log(searchWord);
    if (searchWord) {
      this.showProducts = [...this.products];
    }

    this.showProducts = [...this.products].filter(p => p.title.includes(searchWord) || p.category_Name.includes(searchWord));

  }

}
