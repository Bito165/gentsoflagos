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
import { MerchManagementComponent } from './merch-management/merch-management.component';
import { CustomersComponent } from './customers/customers.component';
import { AcademyApplicationsComponent } from './academy-applications/academy-applications.component';
import { AuthGuard } from "./../../services/auth/auth.guard";

import { OrdersComponent } from './orders/orders.component';
import { DailyRevenueComponent } from './revenue/daily-revenue/daily-revenue.component';
import { WeeklyRevenueComponent } from './revenue/weekly-revenue/weekly-revenue.component';
import { MonthlyRevenueComponent } from './revenue/monthly-revenue/monthly-revenue.component';
import { YearlyRevenueComponent } from './revenue/yearly-revenue/yearly-revenue.component';

const BusinessRoutes: Routes = [
    { path: 'business', component: LoginComponent},
    { path: 'business/view-bookings', component: BookingsComponent, canActivate: [AuthGuard] },
    { path: 'business/view-orders', component: OrdersComponent, canActivate: [AuthGuard] },
    { path: 'business/expenses', component: ExpensesComponent, canActivate: [AuthGuard] },
    { path: 'business/maintenance', component: JournalComponent, canActivate: [AuthGuard] },
    { path: 'business/pl-analysis', component: PLComponent, canActivate: [AuthGuard] },
    { path: 'business/revenue', component: RevenueComponent, canActivate: [AuthGuard] },
    { path: 'business/staff', component: StaffComponent, canActivate: [AuthGuard] },
    { path: 'business/home', component: BusinesshomeComponent, canActivate: [AuthGuard] },
    { path: 'business/merch', component: MerchManagementComponent, canActivate: [AuthGuard] },
    { path: 'business/customers', component: CustomersComponent, canActivate: [AuthGuard] },
    { path: 'business/academy', component: AcademyApplicationsComponent, canActivate: [AuthGuard] }
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
        BusinesshomeComponent,
        MerchManagementComponent,
        CustomersComponent,
        AcademyApplicationsComponent,
        OrdersComponent,
        DailyRevenueComponent,
        WeeklyRevenueComponent,
        MonthlyRevenueComponent,
        YearlyRevenueComponent
    ],
    imports: [
        BrowserModule,
        TemplatesModule,
        FormsModule,
        NgProgressModule,
        RouterModule.forChild(BusinessRoutes),
    ],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class BusinessModule { }
