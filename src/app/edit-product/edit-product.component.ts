import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../interfaces/Icategory';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
    private productservice: ProductsService,
    private router: Router,
    private http: HttpClient,
    private categservice: CategoriesService,
    private activeroute: ActivatedRoute
  ) { }

  productForm = this.formbuilder.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    category: ['', Validators.required],
    minPrice: ['', [Validators.required]],
    maxPrice: ['', [Validators.required]],
    hint: ['', Validators.maxLength(30)],
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


  categories: ICategory[] = [];
  product: any = {};
  productId: any = "";

  ngOnInit(): void {
    this.productId = this.activeroute.snapshot.paramMap.get('id');
    this.productservice.GetAllProducts().subscribe(
      data => {
        this.product = data.find(x => x.id == this.productId);
        console.log(this.product);
      }
    )
    this.categservice.GetAllCategories().subscribe(
      data2 => {
        this.categories = data2;
      }
    )
  }

  updateProduct() {
    if (this.TITLE != null && this.DESCRIPTION != null) {
      var oldProduct = {
        title: this.TITLE.value,
        description: this.DESCRIPTION.value,
        image1: "6ee5fa81-be9c-4d0c-a48a-3d0db669c878.webp",
        image2: "asdsaasdsad",
        image3: "asdsaasdsad",
        image4: "asdsaasdsad",
        image5: "asdsaasdsad",
        sku: "QI159",
        creationDate: new Date(),
        category_Id: this.CATEGORY?.value,
        minPrice: this.MINPRICE?.value,
        maxPrice: this.MAXprice?.value,
        hint: this.HINT?.value
      }
      this.productservice.EditProduct(this.productId, oldProduct).subscribe(
        () => {
          this.router.navigate(['/products']);
        }
      );
      console.log(oldProduct);
    }
  }
  getCategoryName(id:string):any{
    return this.categories.find(c=>c.id==id)?.name;
  }
  isEqual(a:string,b:string):Boolean{
    return a==b;
  }

}
