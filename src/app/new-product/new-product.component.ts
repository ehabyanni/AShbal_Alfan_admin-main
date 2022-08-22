import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from '../interfaces/Icategory';
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
    sku: ['', [Validators.required]],
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
  get SKU() {
    return this.productForm.get('sku');
  }

  //hint property
get HINT() {
  return this.productForm.get('hint');
}

  //description preperty
  get DESCRIPTION() {
    return this.productForm.get('description');
  }


  categories:ICategory[] = []; 

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
        image1: this.fileName1.fileName,
        image2: this.fileName2.fileName,
        image3: this.fileName3.fileName,
        image4: this.fileName4.fileName,
        image5: this.fileName4.fileName,
        sku: this.SKU?.value,
        creationDate: new Date(),
        category_Id: this.CATEGORY?.value,
        category_Name: this.categories.find(c=>c.id==this.CATEGORY?.value)?.name,
        minPrice: this.MINPRICE?.value,
        maxPrice: this.MAXprice?.value,
        hint: this.HINT?.value,
        isTypeExist:false,
        isAmountExist:false
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
  fileName1!:any;
  fileName2!:any;
  fileName3!:any;
  fileName4!:any;

  uploadFile = (files:any,imageNumber:number) => {
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
          console.log(imageNumber);
          switch(imageNumber){
            case 1:
              this.fileName1=event.body;
              break;

            case 2:
              this.fileName2=event.body;
              break;
            case 3:
              this.fileName3=event.body;
              break;
            
            case 4:
              this.fileName4=event.body;
              break;
            
          //   default: {
          //     statements; 
          //     this.fileName4=event.body;

          //     break; 
          //  } 
          }
          
          this.message = 'Upload success.';
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

}
