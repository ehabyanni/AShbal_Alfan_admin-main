import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
     private itemsBlog: BlogService ,
      private activeroute:ActivatedRoute ,
      private router:Router,
      private http:HttpClient
      ) { }

  blogForm = this.formbuilder.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]]
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
  oldImageName:any;
  blog:any = {};

  ngOnInit(): void {
    this.blogId = this.activeroute.snapshot.paramMap.get('id');
    this.itemsBlog.GetAllItems().subscribe(
      data =>{
        this.blog = data.find(x=> x.id == this.blogId);
        console.log(this.blog);
        this.blogForm.setValue({title:this.blog.title,content:this.blog.content})
      }
    )
  }


  updateBlog() {
    if (this.TITLE != null && this.CONTENT != null) {
      var newBlog = {
        title: this.TITLE.value,
        content: this.CONTENT.value,
        image: this.fileName?this.fileName.fileName:this.blog.image,
        creationDate:new Date()
      }
      console.log(newBlog);
      console.log(this.oldImageName);

      this.itemsBlog.EditItem(this.blogId,newBlog).subscribe(
        ()=>{
          this.router.navigate(['/home/blogs']);
        }
      );
    }

  }
  
  progress!: number;
  message!: string;
  fileName!:any;

  uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('http://backend.ashbalalfan.com/api/Product/UploadImage', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / ((event.total)?event.total:1));
        else if (event.type === HttpEventType.Response) {
          if(event.body!=null)
          this.fileName=event.body;
          console.log(this.fileName)
          
          this.message = 'Upload success.';
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
}
