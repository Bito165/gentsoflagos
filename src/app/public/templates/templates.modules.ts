import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppNavComponent} from './app-nav/app-nav.component';
import { AppFooterComponent } from './app-footer/app-footer.component';


@NgModule({
    declarations: [
        AppNavComponent,
        AppFooterComponent
    ],
    imports: [
        BrowserModule,
        RouterModule
    ],
    exports: [
        AppFooterComponent,
        AppNavComponent
    ],
    providers: [],
})
export class TemplatesModule { }
