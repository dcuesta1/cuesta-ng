import { Component } from "@angular/core/";
import { Invoice } from "../_models/Invoice";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { InvoiceService } from "../_services/invoice.service";
import { Customer } from "../_models/Customer";

@Component({
    selector: '.invoicesComp',
    template: `
    <table class="table">
    <thead class="thead-inverse">
      <tr>
        <th>#</th>
        <th>Total Cost</th>
        <th>Ref. Number</th>
        <th>Date Issued</th>
        <th>Customer</th>
        <th>Balance Owed</th>
      </tr>
    </thead>
    <tbody>
    <tr *ngFor="let invoice of invoices">
        <th scope="row">{{ invoice.id }}</th>
        <td>{{ invoice.cost }}</td>
        <td>{{ invoice.number }}</td>
        <td>{{ invoice.created_at | date:"mediumDate" }}</td>
        <td>{{ invoice.customer.fullName() }}</td>
        <td>{{ invoice.balance() }}</td>
    </tr>
    </tbody>
  </table>
    `
})
export class InvoicesComponent implements OnInit{    
    public invoices: Invoice[] = [];

    constructor(private invoiceService: InvoiceService){}

    ngOnInit() {
       this.invoiceService.index()
       .subscribe(
           (invoices) => {
                for (let invoice of invoices) {
                    invoice = new Invoice(invoice);
                    this.invoices.push(invoice);
                }
           }
        );
    }
}
