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
  page:number=0;
  pageSize:number=10;
  isAllBlogsExist:Boolean=false;
  ngOnInit(): void {
    this.itemsBlog.GetAllItemsPagination(this.page,this.pageSize).subscribe(
      data => {
        this.blog = data;
        if(data.length!=this.pageSize){
          this.isAllBlogsExist=true;
        }
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
  getNext(){
    this.page+=1;
    this.itemsBlog.GetAllItemsPagination(this.page,this.pageSize).subscribe(
      data => {
        this.blog.push(...data);
        if(data.length!=this.pageSize){
          this.isAllBlogsExist=true;
        }
      }
    )
  }

}


