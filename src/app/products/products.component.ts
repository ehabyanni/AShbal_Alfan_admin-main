import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productservice:ProductsService , private router:Router) { }

  products: any = []

  ngOnInit(): void {
    this.productservice.GetAllProducts().subscribe(
      data => {
        this.products = data;
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
    this.router.navigate(['/edit-product', id]);
    console.log(id);
  }
}
