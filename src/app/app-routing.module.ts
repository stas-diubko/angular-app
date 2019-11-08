import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AboutBookComponent } from './home/details/details.component';
import { AuthGuard as AuthGuard } from '../app/shared/guards/auth.guard'
import { CartComponent } from './home/cart/cart.component';
import { ProfileComponent } from './home/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: "auth", pathMatch: "full" },

  {
    path: "auth",
    loadChildren:"src/app/auth/auth.module#AuthModule"
  },

  {
    path: "home",
    loadChildren:"src/app/home/home.module#HomeModule"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
