import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NewBlogComponent } from './new-blog/new-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { BlogsComponent } from './blogs/blogs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewBlogComponent,
    EditBlogComponent,
    BlogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
