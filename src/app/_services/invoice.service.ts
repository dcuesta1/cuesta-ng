import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Invoice } from "../_models/Invoice";

@Injectable()
export class InvoiceService {
    constructor(private _api :HttpClient) {}   

    index() {
        return this._api.get<Array<Invoice>>('/invoices');
    }

    userInvoices(username :string) {
        return this._api.get<Array<Invoice>>('/user/' + username + '/invoices');
    }

    show(id:number) {
        return this._api.get<Invoice>('/invoices/' + id)
    }

    create(invoice :Invoice) {
        return this._api.post<Invoice>('/invoices', invoice);
    }

    update(invoice :Invoice) {
        return this._api.put<Invoice>('/invoices/' + invoice.id, invoice);
    }

    destroy(id:number) {
        return this._api.delete<boolean>('/invoices/' + id);
    }
}