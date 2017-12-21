import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { User } from "../_models/User";


@Injectable()
export class UserService {

    private isSigned: boolean = false;
    private currentUser;

    constructor(
        private api:ApiService
    ) {}

    index(role:number = null) {
        let roleUri = role ? '/role/' + role : '';
        return this.api.get('/users' + roleUri);
    }

    show(id:number) {
        return this.api.get('/users/' + id)
    }

    create(user:User) {
        return this.api.post('/users', User);
    }

    update(user:User) {
        return this.api.put('/users/' + user.id, user);
    }

    destroy(id:number) {
        return this.api.delete('/users/' + id);
    }

}