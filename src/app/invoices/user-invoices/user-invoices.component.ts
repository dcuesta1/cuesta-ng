import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../_services/invoice.service';
import { Invoice } from '../../_models/Invoice';
import { User } from '../../_models/User';
import { LocalService } from '../../_services/local.service';

/**
 *  FIGURE OUT SHOP SETTINGS AND BUSINESS MODEL BEFORE CONTINUING
 */


@Component({
  selector: '.userinvoicescomponent',
  templateUrl: './user-invoices.component.html',
  styleUrls: ['./user-invoices.component.scss']
})
export class UserInvoicesComponent implements OnInit {
  public invoices: Invoice[] = [];
  public currentUser: User;

  public paid: number = 0;
  public outstanding: number = 0;
  public estimates: number = 0;

  public invoicePane: boolean = false;
  public selectedInvoice: Invoice;

  constructor(
    private _invoiceService: InvoiceService,
    private _local: LocalService
  ) { 
    this.currentUser = new User(_local.getCurrentUser());
  }

  ngOnInit() {
    let username = this.currentUser.username;
    this._invoiceService.userInvoices(username).subscribe(
      (invoices) => {
        for(let invoice of invoices) {
          this.invoices.push(new Invoice(invoice));
         
          switch (invoice.status) {
            case Invoice.CLOSED:
                this.paid += invoice.cost;
                break;
            case Invoice.PENDING_PAYMENT:
              this.outstanding += invoice.cost;
              break;
            case Invoice.ESTIMATE:
              this.estimates += invoice.cost;
              break;        
          }
        }
      }
    );
  }

  public viewInvoice(invoice: Invoice) {
    this.selectedInvoice = invoice;
  }

  public closeInvoicePane() {
    this.selectedInvoice = null;
    this.invoicePane = false;
  }

}
