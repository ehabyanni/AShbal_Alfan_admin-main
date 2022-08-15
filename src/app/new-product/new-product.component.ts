import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
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
        console.log(this.categories);
      }
    )
  }

  addProduct() {
    if (this.TITLE != null && this.DESCRIPTION != null) {
      var newProduct = {
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
      console.log(newProduct);
      this.productservice.AddProduct(newProduct).subscribe(
        ()=>{
          this.router.navigate(['/home/products']);
        }
      )
    }
  }


  /*image upload */
  
  selectedFile!: File ;
  selectFileImage(event:any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  public urlFile = "http://localhost:4200/assets/images/";

  progress!: number;
  message!: string;
  fileName!:any;

  uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('http://localhost:5216/api/Product/Upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / ((event.total)?event.total:1));
        else if (event.type === HttpEventType.Response) {
          if(event.body!=null)
          this.fileName=event.body;
          console.log(this.fileName)
          
          this.message = 'Upload success.';
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

}
