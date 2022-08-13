import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor(private itemsBlog: BlogService, private router: Router) { }

  blog: any = []

  ngOnInit(): void {
    this.itemsBlog.GetAllItems().subscribe(
      data => {
        this.blog = data;
      }
    )
  }

  DeleteThisBlog(id: any) {
    this.itemsBlog.DeleteItem(id).subscribe(
      () => {
        this.ngOnInit();
      }
    );
    console.log(id + "deleted");
  }

  goToBlogEditor(id: any) {
    //navigate to blog editor
    this.router.navigate(['/edit-blog', id]);
    console.log(id);
  }
}


