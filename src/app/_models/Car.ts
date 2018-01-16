import { BaseModel } from "./BaseModel";

export class Car extends BaseModel {
    public id: number;
    public make: string;
    public year: number;
    public number: string;
    public model: string;
    public customer_id: number;
}