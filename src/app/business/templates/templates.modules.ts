import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BusinessNavComponent} from './business-nav/business-nav.component';


@NgModule({
    declarations: [
        BusinessNavComponent
    ],
    imports: [
        BrowserModule,
        RouterModule
    ],
    exports: [
        BusinessNavComponent
    ],
    providers: [],
})
export class TemplatesModule {}
