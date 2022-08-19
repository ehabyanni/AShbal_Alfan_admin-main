import { Component, OnInit } from '@angular/core';
import { HomeInfoService } from '../services/home-info.service';

@Component({
  selector: 'app-number-blogs-products',
  templateUrl: './number-blogs-products.component.html',
  styleUrls: ['./number-blogs-products.component.scss']
})
export class NumberBlogsProductsComponent implements OnInit {

  constructor(private homeInfo:HomeInfoService) { }
  Information:any;
  ngOnInit(): void {
    this.homeInfo.getHomeInfo().subscribe(
      data=>{
        this.Information=data;
      }
    );
  }

}
