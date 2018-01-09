import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalService } from '../_services/local.service';
import { User } from "../_models/User";

@Injectable()
export class SuperUserGuard implements CanActivate{
    private currentuser: User;

    constructor(
        private _router: Router,
        private _local: LocalService
    ) {
        this.currentuser = new User(this._local.getCurrentUser());
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.currentuser.role === User.SUPERUSER) {
            return true;
        }

        this._router.navigate(['/dashboard']);
        return false;
    }

}