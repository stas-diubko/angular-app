import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material.module';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { CustomHttpInterceptorService } from './shared/services/interceptor';
import RegistrationService from './shared/services/registration.service';
import { HeaderComponent } from './shared/containers/header/header.component';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // CommonModule,
    // ReactiveFormsModule,
    // FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true },
    RegistrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
