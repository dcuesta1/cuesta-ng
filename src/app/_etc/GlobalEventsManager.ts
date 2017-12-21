import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { User } from "../_models/User";

@Injectable()
export class GLobalEventsManager {
    public user:User;

    private _showNavigations: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public showNavEmitter: Observable<boolean> = this._showNavigations.asObservable();

    private _currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User);
    public currentUserEmitter: Observable<boolean> = this._showNavigations.asObservable();

    showNavigations(ifShow: boolean) {
        this._showNavigations.next(ifShow);
    }

    logUser(user: User) {
        this._currentUser.next(user);
        this.user = user;
    }
}