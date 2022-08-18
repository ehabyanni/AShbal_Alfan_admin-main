import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { EditPriceComponent } from './edit-price/edit-price.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewBlogComponent } from './new-blog/new-blog.component';
import { NewProductComponent } from './new-product/new-product.component';
import { NumberBlogsProductsComponent } from './number-blogs-products/number-blogs-products.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:''                      , component:NumberBlogsProductsComponent                },
  {
    path:'home'                 , component:HomeComponent,    
    children:[
      {path:'blogs'             , component:BlogsComponent                  },
      {path:'new-blog'          , component:NewBlogComponent                },
      {path:'edit-blog/:id'     , component:EditBlogComponent               },
      {path:'products'          , component:ProductsComponent               },
      {path:'new-product'       , component:NewProductComponent             },
      {path:'edit-product/:id'  , component:EditProductComponent            },
      {path:'edit-price/:id'    , component:EditPriceComponent              },
      {path:'dashboard'         , component:NumberBlogsProductsComponent    }
    ]
  },
  {path:'login'                 , component:LoginPageComponent                          },
  {path:'**'                    , component:NumberBlogsProductsComponent                }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
