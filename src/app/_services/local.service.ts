import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { User } from "../_models/User";

@Injectable()
export class LocalService {
    getCurrentUser() : User{
        return JSON.parse(localStorage.getItem(environment.local.currentUser));
        
    }

    SetCurrentUser(user:User) :void{
        localStorage.setItem(environment.local.currentUser, JSON.stringify(user));
    }

    getDeviceId() : string{
        return localStorage.getItem(environment.local.deviceId);
        
    }

    SetDeviceId(deviceId: string) :void{
        localStorage.setItem(environment.local.deviceId, deviceId);
    }

    getAuthToken() : string{
        return localStorage.getItem(environment.local.authToken);
        
    }

    SetAuthToken(authToken: string) :void{
        localStorage.setItem(environment.local.authToken, authToken);
    }

    clear() :void {
        localStorage.clear();
    }
}