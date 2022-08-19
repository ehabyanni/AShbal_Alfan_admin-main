import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductDetails } from '../interfaces/IProductDetails';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.scss']
})
export class EditPriceComponent implements OnInit {

  constructor(private activeroute:ActivatedRoute , private productservice:ProductsService) { }

  product: any = {};
  productId: any = "";

  // prices:any = [
  //   {
  //     "type"    : "كوشيه مطفي / لامع",
  //     "amount"  : 500 ,
  //     "price"   : 150
  //   },
  //   {
  //     "type"    : "كوشيه مطفي / لامع",
  //     "amount"  : 700 ,
  //     "price"   : 200
  //   },{
  //     "type"    : "كوشيه مطفي / لامع",
  //     "amount"  : 1000 ,
  //     "price"   : 300
  //   },{
  //     "type"    : "A5 / A4",
  //     "amount"  : 500 ,
  //     "price"   : 120
  //   },{
  //     "type"    : "A5 / A4",
  //     "amount"  : 700 ,
  //     "price"   : 170
  //   },{
  //     "type"    : "A5 / A4",
  //     "amount"  : 1000 ,
  //     "price"   : 210
  //   },{
  //     "type"    : "ورق 80 جرام مفرد",
  //     "amount"  : 500 ,
  //     "price"   : 130
  //   },{
  //     "type"    : "ورق 80 جرام مفرد",
  //     "amount"  : 700 ,
  //     "price"   : 180
  //   },{
  //     "type"    : "ورق 80 جرام مفرد",
  //     "amount"  : 1000 ,
  //     "price"   : 220
  //   },

  // ]

  type:boolean = false;
  amount:boolean = false;
  productDetails:IProductDetails[]=[];
  ngOnInit(): void {
    this.productId = this.activeroute.snapshot.paramMap.get('id');
    this.productservice.GetAllProducts().subscribe(
      data => {
        this.product = data.find(x => x.id == this.productId);
        this.type = this.product.isTypeExist;
        this.amount = this.product.isAmountExist;
        console.log(this.type);
        console.log(this.amount);
      }
    )
    this.productservice.GetProductPricePlane(this.productId).subscribe(
      data=>{
        this.productDetails=data;
        //console.log(data);
      }
    );
  }


  updatePrice1(){
    this.productservice.EditProductPricePlane(this.productId,this.productDetails).subscribe(
      ()=>{
        alert("تم التحديث");
        this.ngOnInit();
        
      }
    );
  }
  
  updatePrice(){
    console.log(this.productDetails);
  }
  
}
