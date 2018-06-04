import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
 import { BusinessModule } from './business/business.module'; 
import { PublicModule } from './public/public.module';
import { HomeComponent } from './public/home/home.component';


const appRoutes: Routes = [
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PublicModule,
    BusinessModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
