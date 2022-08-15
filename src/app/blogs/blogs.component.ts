import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBlog } from '../interfaces/Iblog';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor(private itemsBlog: BlogService, private router: Router , private activeroute:ActivatedRoute) { }

  blog: IBlog[] = []

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
        this.blog.splice(this.blog.findIndex(b=>b.id==id),1);
      }
    );
    console.log(id + "deleted");
  }

  goToBlogEditor(id: any) {
    //navigate to blog editor
    this.router.navigate(['/home/edit-blog', id]);
    console.log(id);
  }

}


