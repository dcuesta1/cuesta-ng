import { BaseModel } from "./BaseModel";
import { Invoice } from "./Invoice";

export class User extends BaseModel{
    static readonly SUPERUSER :number = 1;
    static readonly ADMIN :number = 2;

    id: number;
    name: string;
    username: string;
    email: string;
    role: number;
    createdAt: string;
    invoices: Invoice[];
    password: string = null;

    constructor(model:any = null) {
        super(model);

        if(this.invoices) {
            var i = 0;
            for(let invoice of this.invoices) {
                this.invoices[i] = new Invoice(invoice);
                i++;
            }
        }
    }

    isSuperUser() {
        return (this.role === User.SUPERUSER);
    }

    isAdmin() {
        return (this.role === User.ADMIN);
    }
}