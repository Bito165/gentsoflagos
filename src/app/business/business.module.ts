import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatesModule } from "./templates/templates.modules";
import { BookingsComponent } from './bookings/bookings.component'
import { ExpensesComponent } from './expenses/expenses.component'
import { JournalComponent } from './journal/journal.component'
import { LoginComponent } from './login/login.component'
import { PLComponent } from './p-l/p-l.component'
import { RevenueComponent } from './revenue/revenue.component'
import { StaffComponent } from './staff/staff.component';
import { BusinesshomeComponent } from './businesshome/businesshome.component';
import { FormsModule } from "@angular/forms";
import { NgProgressModule } from "ngx-progressbar";

const BusinessRoutes: Routes = [
    { path: 'business', component: LoginComponent },
    { path: 'business/view-bookings', component: BookingsComponent },
    { path: 'business/expenses', component: ExpensesComponent },
    { path: 'business/oflagosjournal', component: JournalComponent },
    { path: 'business/pl-analysis', component: PLComponent },
    { path: 'business/revenue', component: RevenueComponent },
    { path: 'business/staff', component: StaffComponent },
    { path: 'business/home', component: BusinesshomeComponent },
];

@NgModule({
    declarations: [
        LoginComponent,
        BookingsComponent,
        ExpensesComponent,
        JournalComponent,
        PLComponent,
        RevenueComponent,
        StaffComponent,
        BusinesshomeComponent
    ],
    imports: [
        BrowserModule,
        TemplatesModule,
        FormsModule,
        NgProgressModule,
        RouterModule.forChild(BusinessRoutes),
    ],
    exports: [RouterModule],
    providers: [],
})
export class BusinessModule { }
