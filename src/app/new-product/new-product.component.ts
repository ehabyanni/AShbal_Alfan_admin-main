import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
    private productservice: ProductsService,
    private router: Router,
    private http: HttpClient , private categservice:CategoriesService  ) { }

  productForm = this.formbuilder.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    category: ['', Validators.required],
    minPrice: ['' , [Validators.required]],
    maxPrice: ['', [Validators.required]],
    hint: ['' , Validators.maxLength(30)],
    description: ['', [Validators.required, Validators.minLength(50)]]
  })

  //title property
  get TITLE() {
    return this.productForm.get('title');
  }

  //title property
  get CATEGORY() {
    return this.productForm.get('category');
  }

  //minPric property
  get MINPRICE() {
    return this.productForm.get('minPrice');
  }

  //minPric property
  get MAXprice() {
    return this.productForm.get('maxPrice');
  }

  //hint property
  get HINT() {
    return this.productForm.get('hint');
  }

  //description preperty
  get DESCRIPTION() {
    return this.productForm.get('description');
  }


  categories:any = []; 

  ngOnInit(): void {
    this.categservice.GetAllCategories().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

  addProduct() {
    if (this.TITLE != null && this.DESCRIPTION != null) {
      var newProduct = {
        title: this.TITLE.value,
        description: this.DESCRIPTION.value,
        image: "asdsaasdsad",
        creationDate: new Date(),
        category: this.CATEGORY?.value,
        minPrice: this.MINPRICE?.value,
        maxPrice: this.MAXprice?.value,
        hint: this.HINT?.value
      }
      console.log(newProduct);
      this.productservice.AddProduct(newProduct).subscribe(
        ()=>{
          this.router.navigate(['/products']);
        }
      )
    }
  }

}
