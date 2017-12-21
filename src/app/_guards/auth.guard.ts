import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalService } from '../_services/local.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private local: LocalService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.local.getCurrentUser()) {
            return true;
        }

        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}