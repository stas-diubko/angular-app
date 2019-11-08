import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AboutBookComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home.component';


const routes: Routes = [

  {
    path: "",
    component: HomeComponent,
    children: [
        { path: "", redirectTo: "products", pathMatch: "full" },
        { path: "products", component: ProductsComponent,
        // canActivate: [AuthGuard] 
        }, 
        {
            path: "books/:id",
            component: AboutBookComponent
        },
        {
            path: "cart",
            component: CartComponent
        },
        {
            path: "profile",
            component: ProfileComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
