import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { HomeComponent } from './home/home.component';
import { NewBlogComponent } from './new-blog/new-blog.component';

const routes: Routes = [
  {path:'home'              , component:HomeComponent},
  {path:'blogs'             , component:BlogsComponent},
  {path:'new-blog'          , component:NewBlogComponent },
  {path:'edit-blog/:id'     , component:EditBlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
