import { Customer } from "./Customer";
import { Payment } from "./Payment";
import { BaseModel } from "./BaseModel";

export class Invoice extends BaseModel{
    id: number;
    user_id: number;
    number: string;
    cost: number;
    status: number;
    customer: Customer;
    payments: Payment[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    constructor(model: any) {
        super(model);
        let customer = this.customer[0];
        this.customer = new Customer(customer);

        var i = 0;
        for(let payment of this.payments) {
            this.payments[i] = new Payment(payment);
            i++;
        }
    }

    balance() {
        return (this.cost - this.net()) > 0 ? '$'+(this.cost - this.net()).toFixed(2) : 'Paid';
    }
    
    net() :number {
        let net = 0.00;

        for(let payment of this.payments) {
            net += payment.net;
        }

        return net;
    }
}