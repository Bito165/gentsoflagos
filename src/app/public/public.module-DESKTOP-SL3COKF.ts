import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TheShopComponent } from './the-shop/the-shop.component';
import { MerchComponent } from './merch/merch.component';
import { TheTeamComponent } from './the-team/the-team.component';
import { ServicesComponent } from './services/services.component';
import { AcademyComponent } from './academy/academy.component';
import { BookingsComponent } from './bookings/bookings.component';
import { TemplatesModule } from "./templates/templates.modules";
import { TermsComponent } from './terms/terms.component';
import { RefundsComponent } from './refunds/refunds.component';
import { FormsModule } from "@angular/forms";

const PublicRoutes: Routes = [
            { path: '', component: HomeComponent },
            { path: 'theshop', component: TheShopComponent },
            { path: 'merch', component: MerchComponent },
            { path: 'theteam', component: TheTeamComponent },
            { path: 'services', component: ServicesComponent },
            { path: 'academy', component: AcademyComponent },
            { path: 'bookings', component: BookingsComponent },
            { path: 'refunds', component: RefundsComponent },
            { path: 'terms', component: TermsComponent },
];

@NgModule({
    declarations: [
        HomeComponent,
        TheShopComponent,
        MerchComponent,
        TheTeamComponent,
        ServicesComponent, 
        AcademyComponent,
        BookingsComponent,
        TermsComponent,
        RefundsComponent
    ],
    imports: [
        BrowserModule,
        TemplatesModule,
        FormsModule,
        RouterModule.forChild(PublicRoutes),
    ],
    exports: [RouterModule],
    providers: [],
})
export class PublicModule { }

