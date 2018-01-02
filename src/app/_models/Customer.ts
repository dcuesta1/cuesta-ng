import { BaseModel } from "./BaseModel";

export class Customer extends BaseModel {
    id: number;
    business_id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    address_one: string;
    address_two: string;
    city: string;
    state: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    fullName() :string{
        return this.first_name + ' ' + this.last_name;
    }
}