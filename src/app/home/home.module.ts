import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { AboutBookComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from '../shared/modules/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { ProductsComponent } from './products/products.component';

@NgModule({
    declarations: [
        HomeComponent,
        AboutBookComponent,
        CartComponent,
        ProfileComponent,
        ProductsComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      HomeRoutingModule
    ]
  })
  export class HomeModule { }
  