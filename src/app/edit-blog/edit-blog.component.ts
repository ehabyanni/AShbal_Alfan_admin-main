import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private itemsBlog: BlogService , private activeroute:ActivatedRoute) { }

  blogForm = this.formbuilder.group({
    title: ['', [Validators.required, Validators.minLength(10)]],
    content: ['', [Validators.required, Validators.minLength(100)]]
  })

  //title property
  get TITLE() {
    return this.blogForm.get('title');
  }

  //message preperty
  get CONTENT() {
    return this.blogForm.get('content');
  }

  blogId:any;
  blog:any = {};

  ngOnInit(): void {
    this.blogId = this.activeroute.snapshot.paramMap.get('id');
    this.itemsBlog.GetAllItems().subscribe(
      data =>{
        this.blog = data.find(x=> x.id == this.blogId);
        console.log(this.blog);
      }
    )
  }


  updateBlog() {
    if (this.TITLE != null && this.CONTENT != null) {
      var oldBlog = {
        title: this.TITLE.value,
        content: this.CONTENT.value,
        image: "asdsaasdsad"
      }

      this.itemsBlog.EditItem(oldBlog, `622ca8c59f6c668226f74f52`).subscribe();
    }
  }
}
