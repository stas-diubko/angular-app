import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { AboutBookComponent } from './details/details.component';
import { AuthGuard as AuthGuard } from '../app/shared/guards/auth.guard'
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: "auth", pathMatch: "full" },

  {
    path: "auth",
    loadChildren:"src/app/auth/auth.module#AuthModule"
  },

  {
    path: "home",
    component: HomeComponent, 
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


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
