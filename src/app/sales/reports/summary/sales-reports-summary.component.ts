import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models/User';
import { LocalService } from '../../../_services/local.service';
import { InvoiceService } from '../../../_services/invoice.service';
import { Invoice } from '../../../_models/Invoice';

@Component({
  selector: '.salessummarycomponent',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SalesReportsSummaryComponent implements OnInit {
  private currentUser: User;
  public invoices: Invoice[]= [];
  
  public grossSalesSales: number = 0.00;
  public grossSalesRefunds: number = 0.00;
  public grossSalesNet: number = 0.00;

  public discountSales: number = 0.00;
  public discountRefunds: number = 0.00;
  public discountNet: number = 0.00;

  public netSalesSales: number = 0.00;
  public netSalesRefunds: number = 0.00;
  public netSalesNet: number = 0.00;

  public taxSales: number = 0.00;
  public taxRefunds: number = 0.00;
  public taxNet: number = 0.00;

  public tipsSales: number = 0.00;
  public tipsRefunded: number = 0.00;
  public tipsNet: number = 0.00;

  public totalCollectedSales: number = 0.00;
  public totalCollectedRefunded: number = 0.00;
  public totalCollectedNet: number = 0.00;

  public merchantFeesSales: number = 0.00;

  public netTotalSales: number = 0.00;
  public netTotalRefunds: number = 0.00;
  public netTotalNet: number = 0.00;

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
          this.invoices.push(new Invoice(invoice));
        }

        this.invoicesParser();
      }
    );

  }

  public invoicesParser() :void{
    // Total Sales

    for(let invoice of this.invoices) {
      this.grossSalesNet += invoice.grossSale();
      this.grossSalesSales += invoice.grossSale();

      this.tipsNet += invoice.tips(); 
      this.tipsSales += invoice.tips(); 

      this.netTotalSales += invoice.totalPaid(); 
      this.netTotalNet += invoice.totalPaid(); 

      this.taxNet += invoice.fees(); 
      this.taxSales += invoice.fees(); 

      this.totalCollectedNet += invoice.totalCollected();

      this.merchantFeesSales += invoice.merchantFees();

      this.netSalesNet += invoice.net();
      this.netSalesSales += invoice.net();

    }

  }
}
