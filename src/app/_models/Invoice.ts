import { Customer } from "./Customer";
import { Payment } from "./Payment";
import { BaseModel } from "./BaseModel";

export class Invoice extends BaseModel{
    static readonly PENDING_PAYMENT = 1;
    static readonly ESTIMATE = 2;
    static readonly CLOSED = 4;
    static readonly CANCELLED = 8;

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
        if(this.customer) {
            let customer = this.customer[0];
            this.customer = new Customer(customer);
        }

        if(this.payments) {
            var i = 0;
            for(let payment of this.payments) {
                this.payments[i] = new Payment(payment);
                i++;
            }
        }
    }

    balance() :string{
        let balance :number = this.cost - this.net();
        return  balance > 0 ? '$' + String(balance) : 'Paid';
    }
    
    net() :number {
        let net = 0.00;

        for(let payment of this.payments) {
            net += payment.net;
        }

        return this.round(net);
    }

    tips() :number{
        let val = 0;

        for(let payment of this.payments) {
            val += payment.tip;
        }

        return this.round(val);
    }

    fees() :number{
        let val = 0;

        for(let payment of this.payments) {
            val += payment.fees;
        }

        return this.round(val);
    }

    merchantFees() :number{
        let val = 0;

        for(let payment of this.payments) {
            val += payment.merchant_fees;
        }

        return this.round(val);
    }

    grossSale() :number {
        return this.round(this.net() + this.fees());
    }

    totalCollected() :number {
        return this.round(this.net() + this.tips() + this.fees());
    }

    totalPaid() :number{
        return this.round(this.net() + this.tips() + this.fees() + this.merchantFees());
    }

    round(value: number) :number {
        return value/100;
    }

    public getStatus() :string{
        let status = ''
        switch (this.status) {
            case Invoice.CLOSED:
                status = 'Paid';
                break;
            case Invoice.PENDING_PAYMENT:
                status = 'Unpaid';
                break;
            case Invoice.ESTIMATE:
                status = 'Estimate';
                break;     
            case Invoice.CANCELLED:
                status = 'Cancelled';
                break;       
        }

        return status;
    }
}