import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/Iproduct';
import { IUser } from '../interfaces/IUser';
import { ProductsService } from '../services/products.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userservice:UserService) { }

  showProducts:IProduct[] = [];

  users:IUser[]=[];

  ngOnInit(): void {
    //Fill Products
    this.userservice.GetAllItems().subscribe(
      data => {
        this.users = data;
      }
    )

  }

}
