import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Invoice } from "../_models/Invoice";

@Injectable()
export class InvoiceService {
    constructor(private api :HttpClient) {}   

    index() {
        return this.api.get<Array<Invoice>>('/invoices');
    }

    show(id:number) {
        return this.api.get<Invoice>('/invoices/' + id)
    }

    create(invoice :Invoice) {
        return this.api.post<Invoice>('/invoices', invoice);
    }

    update(invoice :Invoice) {
        return this.api.put<Invoice>('/invoices/' + invoice.id, invoice);
    }

    destroy(id:number) {
        return this.api.delete<boolean>('/invoices/' + id);
    }
}