import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  { path: '', redirectTo: "auth", pathMatch: "full" },

  {
    path: "auth",
    loadChildren:"src/app/auth/auth.module#AuthModule"
  },

  {
    path: "main",
    component: MainComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
