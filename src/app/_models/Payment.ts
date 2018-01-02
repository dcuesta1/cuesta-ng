import { BaseModel } from "./BaseModel";

export class Payment extends BaseModel{
    id: number;
    invoice_id: number;
    ref: number;
    net: number;
    tip: number;
    fees: number;
    merchant_fees: number;
    cc_last_four: number;
    type: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}