import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*
  Components
*/
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './_layout/navbar/navbar.component';
import { SidebarComponent } from './_layout/sidebar/sidebar.component';
/*
  Services
*/
import { LocalService } from './_services/local.service';
import { GLobalEventsManager } from './_etc/GlobalEventsManager';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { InvoicesComponent } from './invoices/invoices.component';
import { CustomersComponent } from './customers/customers.component';
import { InvoiceService } from './_services/invoice.service';
import { AuthInterceptorProvider } from './_etc/AuthInterceptor';

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
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
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
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthInterceptorProvider,
    LocalService,
    UserService,
    AuthService,
    InvoiceService,
    GLobalEventsManager,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
