import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { LocalService } from "../../_services/local.service"
import { CustomerService } from '../../_services/customer.service';
import { Customer } from '../../_models/Customer';
import { ModalService } from '../../_services/modal.service';
import { Invoice } from '../../_models/Invoice';

@Component({
  selector: '.userscustomerscomponent',
  templateUrl: './user-customers.component.html',
  styleUrls: ['./user-customers.component.scss']
})

export class UserCustomersComponent implements OnInit{
  private _currentUser: User;
  public customerPane: boolean = false;
  public customer :Customer;
  public searchInput;
  public customers: Array<Customer> = [];

  constructor(
    private _local :LocalService,
    private _modalService: ModalService,
    private _customerService :CustomerService
  ) { 
    this._currentUser = new User(_local.getCurrentUser());
  }

  ngOnInit() {
    //Grab Customers
    this._customerService.userCustomers(this._currentUser.username).subscribe((customers) => {
      for(let customer of customers) {
        for (let i = 0; i < customer.invoices.length; i++){
          customer.invoices[i] = new Invoice(customer.invoices[i]);
        }
        this.customers.push(new Customer(customer));
      }
    });
    //Search Filter
  }

  public updateCustomer(customer: Customer) :void{
    this.customer = customer;
  }

  public addVehicle(car) :void {
    this.customer.cars.push(car);
  }

  public viewCustomer(customer: Customer) :void {
    this.customer = customer;
    this.customerPane = true;
  }

  public closeCustomerPane() :void {
    this.customerPane = false;
  }

  public openModal(id: string){
    this._modalService.open(id);
  }
}
