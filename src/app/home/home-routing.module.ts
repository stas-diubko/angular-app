import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AboutBookComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../shared/guards/auth.guard';


const routes: Routes = [

  {
    path: "",
    component: HomeComponent,
    children: [
        { path: "", redirectTo: "products", pathMatch: "full" },
        { path: "products", component: ProductsComponent
        }, 
        {
            path: "books/:id",
            component: AboutBookComponent
        },
        {
            path: "cart",
            component: CartComponent,
            canActivate: [AuthGuard]
        },
        {
            path: "profile",
            component: ProfileComponent,
            canActivate: [AuthGuard]

        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
