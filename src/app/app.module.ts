import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*
  Components
*/
// Global
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './_layout/navbar/navbar.component';
import { SidebarComponent } from './_layout/sidebar/sidebar.component';
// Super
import { UsersComponent } from './users/index/users.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { CustomersComponent } from './customers/customers.component';
// Admin
import { SalesReportsSummaryComponent } from './sales/reports/summary/sales-reports-summary.component';
/*
  Services
*/
import { LocalService } from './_services/local.service';
import { GLobalEventsManager } from './_etc/GlobalEventsManager';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';
import { InvoiceService } from './_services/invoice.service';

/*
  Guards & Stuff
*/
import { AuthGuard } from './_guards/auth.guard';
import { SuperUserGuard } from './_guards/superUser.guard';
import { AuthInterceptorProvider } from './_etc/AuthInterceptor';
import { UserCustomersComponent } from './customers/user-customers/user-customers.component';
import { TransactionsComponent } from './sales/transactions/transactions.component';
import { UserInvoicesComponent } from './invoices/user-invoices/user-invoices.component';
import { SettingsModule } from './settings/settings.module';
import { LoadingSpinnerComponent } from './_layout/loading-spinner/loading-spinner.component';
import { CustomerService } from './_services/customer.service';
import { ModalDirective } from './_directives/modal.directive';
import { ModalService } from './_services/modal.service';
import { EditUserComponent } from './customers/user-customers/edit-customer/edit-customer.component';
import { EditVehiclesComponent } from './customers/user-customers/edit-vehicles/edit-vehicles.component';
import { CarService } from './_services/car.service';
import { NewVehicleComponent } from './customers/user-customers/new-vehicle/new-vehicle.component';
import { AutoTelematicService } from './_services/auto-telematic.service';

/*
  Routes
*/
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':username/sales/reports/summary',
    component: SalesReportsSummaryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':username/sales/transactions',
    component: TransactionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':username/customers',
    component: UserCustomersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':username/invoices',
    component: UserInvoicesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    canActivate: [SuperUserGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [SuperUserGuard]
  },
  {
    path: 'settings',
    loadChildren: 'app/settings/settings.module#SettingsModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    InvoicesComponent,
    CustomersComponent,
    UsersComponent,
    UserCustomersComponent,
    UserInvoicesComponent,
    SalesReportsSummaryComponent,
    TransactionsComponent,
    LoadingSpinnerComponent,
    EditUserComponent,
    ModalDirective,
    EditVehiclesComponent,
    NewVehicleComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    SettingsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthInterceptorProvider,
    LocalService,
    UserService,
    AuthService,
    InvoiceService,
    CustomerService,
    CarService,
    AutoTelematicService,
    GLobalEventsManager,
    ModalService,
    AuthGuard,
    SuperUserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
