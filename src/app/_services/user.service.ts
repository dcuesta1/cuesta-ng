import { Injectable } from "@angular/core";
import { User } from "../_models/User";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class UserService {
    constructor(
        private api: HttpClient
    ) {}

    index(role:number = null) {
        let roleUri = role ? '/role/' + role : '';
        return this.api.get<User[]>('/users' + roleUri);
    }

    show(id:number) {
        return this.api.get<User>('/users/' + id)
    }

    create(user:User) {
        return this.api.post<User>('/users', user);
    }

    update(user:User) {
        return this.api.put<User>('/users/' + user.id, user);
    }

    destroy(id:number) {
        return this.api.delete<boolean>('/users/' + id);
    }

}