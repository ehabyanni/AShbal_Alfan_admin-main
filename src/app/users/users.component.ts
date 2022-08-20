import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/Iproduct';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private productservice:ProductsService) { }

  showProducts:IProduct[] = [];

  users = [
    {
      "name"  : "Ahmed Hassan",
      "email" : "ahmed12hassan@hotmail.com"
    },
    {
      "name"  : "Ahmed Hassan",
      "email" : "ahmed12hassan@hotmail.com"
    },
    {
      "name"  : "Ahmed Hassan",
      "email" : "ahmed12hassan@hotmail.com"
    },
    {
      "name"  : "Ahmed Hassan",
      "email" : "ahmed12hassan@hotmail.com"
    },
    {
      "name"  : "Ahmed Hassan",
      "email" : "ahmed12hassan@hotmail.com"
    },
    {
      "name"  : "Ahmed Hassan",
      "email" : "ahmed12hassan@hotmail.com"
    },
  ]

  ngOnInit(): void {
    //Fill Products
    this.productservice.GetAllProducts().subscribe(
      data => {
        this.showProducts = data;
      }
    )

  }

}
