import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
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

  constructor(private formbuilder:FormBuilder,private itemsBlog:BlogService,private router:Router , private http:HttpClient) { }

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
        image:this.fileName.fileName,
        creationDate: new Date()
      }
      console.log(newBlog);
      this.itemsBlog.AddItem(newBlog).subscribe(
        ()=>{
          this.router.navigate(['/home/blogs']);
        }
      );
    }  
  }

  selectedFile!: File ;
  selectFileImage(event:any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  public urlFile = "http://localhost:4200/assets/images/";

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
    this.http.post('http://backend.ashbalalfan.com/api/Product/Upload', formData, {reportProgress: true, observe: 'events'})
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
