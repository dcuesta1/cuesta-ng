import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Customer } from "../_models/Customer";

@Injectable()
export class CustomerService {
    constructor(private _api :HttpClient) {}   

    index() {
        return this._api.get<Array<Customer>>('/invoices');
    }

    userCustomers(username :string) {
        return this._api.get<Array<Customer>>('/user/' + username + '/customers');
    }

    show(id:number) {
        return this._api.get<Customer>('/customers/' + id)
    }

    create(customer :Customer) {
        return this._api.post<Customer>('/customers', customer);
    }

    update(customer :Customer) {
        return this._api.put<Customer>('/customers/' + customer.id, customer);
    }

    destroy(id:number) {
        return this._api.delete<boolean>('/customers/' + id);
    }
}