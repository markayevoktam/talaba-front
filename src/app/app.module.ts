import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { DeleteDialog } from './shared/delete-dialog.component';
import { AuthInterceptor } from './shared/auth-interceptor';
import { HomeComponent } from './public/home/home.component';
import { InfoComponent } from './public/info/info.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { StudentComponent } from './public/student/student.component';
import { TalentdComponent } from './public/talentd/talentd.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteDialog,
    HomeComponent,
    InfoComponent,
    LoginComponent,
    RegisterComponent,
    StudentComponent,
    TalentdComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
