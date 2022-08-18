import { HttpClient,HttpErrorResponse, HttpEventType } from '@angular/common/http';
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
    sku: ['', [Validators.required]],
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

  //sku property
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
        image1: this.fileName1?this.fileName1.fileName:this.product.image1,
        image2: this.fileName2?this.fileName2.fileName:this.product.image2,
        image3: this.fileName3?this.fileName3.fileName:this.product.image3,
        image4: this.fileName4?this.fileName4.fileName:this.product.image4,
        image5: "aaaaaaaa",
        sku: this.SKU?.value,
        creationDate: new Date(),
        category_Id: this.CATEGORY?.value,
        minPrice: this.MINPRICE?.value,
        maxPrice: this.MAXprice?.value,
        hint: this.HINT?.value
      }
      this.productservice.EditProduct(this.productId, oldProduct).subscribe(
        () => {
          this.router.navigate(['/home/products']);
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
