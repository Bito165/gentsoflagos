import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
 import { BusinessModule } from './business/business.module'; 
import { PublicModule } from './public/public.module';
import { HomeComponent } from './public/home/home.component';
import { ApiBaseService } from "../services/apibase/api-base.service";
import { HttpClientModule } from "@angular/common/http";
import { LocalStorage, LocalStorageService, SessionStorage, SessionStorageService } from "ngx-webstorage";



const appRoutes: Routes = [
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  
  imports: [
    BrowserModule,
    PublicModule,
    BusinessModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
  ],
  providers: [
    LocalStorageService,
    ApiBaseService,
    SessionStorageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
