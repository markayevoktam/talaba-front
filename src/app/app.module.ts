import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
//Angular Material Components
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { material_imports } from './shared/material-import';
import { HomeComponent } from './public/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { DeleteDialog } from './shared/delete-dialog.component';
import { MyFilterService } from './core/my-filter.service';
@NgModule({
  declarations: [
    AppComponent,
    DeleteDialog,
    HomeComponent,
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   
   
    ...material_imports
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyFilterService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
