import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../_services/local.service';
import { User } from '../../_models/User';
import { InvoiceService } from '../../_services/invoice.service';
import { Invoice } from '../../_models/Invoice';

@Component({
  selector: '.salestransactionscomponent',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  private currentUser: User;
  public invoices :Invoice[] = [];

  public totalTransactions: number = 0;
  public totalCollected: number = 0.00;
  public netSales: number = 0.00;

  public transactions :Array<any>;
  public dates :Array<any>;

  constructor(
    private _local :LocalService,
    private _invoiceService :InvoiceService
  ) { 
    this.currentUser = new User(_local.getCurrentUser());
  }

  ngOnInit() {
    this._invoiceService.userInvoices(this.currentUser.username).subscribe(
      (invoices) => {
        for(let invoice of invoices) {
          this.totalTransactions += invoice.payments.length;   
          this.invoices.push(new Invoice(invoice));
        }

        var date = this.invoices[0].created_at;
        for(let invoice of this.invoices) {
          this.netSales += invoice.net();
          this.totalCollected += invoice.totalCollected();  
        
          for(let payment of invoice.payments) {
            let dateRow = {
              date: invoice.created_at,
              total: payment.net
            };
            this.dates.push(dateRow);
            
            let invoiceRow = {
              total: payment.net,
              type: payment.type,
              customer: invoice.number,
            };
          }
        }

        console.log(this.dates);
      }
    );
  }


}
