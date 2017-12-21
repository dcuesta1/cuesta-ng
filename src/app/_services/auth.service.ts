import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { User } from "../_models/User";
import { LocalService } from "./local.service";

@Injectable()
export class AuthService {
    
    private device:string;
    public currentUser: User
    
    constructor(
        private api:ApiService,
        private local:LocalService
    ){}

    setDevice() :void{
        //TODO: modify for cordova device id
        this.device =  (Math.random()+ +new Date).toString(36).replace('.','');
        this.local.SetDeviceId(this.device)
    }

    authenticate(email, password) {
        this.setDevice();
        let device = this.device;
        return this.api.post('/authenticate', {email, password, device});
    }
}