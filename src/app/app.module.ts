import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material.module';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { CustomHttpInterceptorService } from './shared/interceptors/interceptor';
import RegistrationService from './shared/services/registration.service';
import { CommonModule } from '@angular/common';
import { AboutBookComponent } from './home/details/details.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CartComponent } from './home/cart/cart.component';
import { ProfileComponent } from './home/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true },
    RegistrationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
