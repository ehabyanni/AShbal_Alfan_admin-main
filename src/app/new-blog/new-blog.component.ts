import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IBlog } from '../interfaces/Iblog';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.scss']
})
export class NewBlogComponent implements OnInit {

  constructor(private formbuilder:FormBuilder,private itemsBlog:BlogService,private router:Router) { }

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

  ngOnInit(): void {
  }

  addBlog(){
    if(this.TITLE!=null&&this.CONTENT!=null){
   var  newBlog={
        title :this.TITLE.value,
        content : this.CONTENT.value,
        image:"asdsaasdsad",
        creationDate: new Date()
      }
      console.log(newBlog);
      this.itemsBlog.AddItem(newBlog).subscribe();
      this.router.navigate(['/blogs']);
    }  
  }

}
