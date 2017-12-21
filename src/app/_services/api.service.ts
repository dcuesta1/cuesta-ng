import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment"
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { LocalService } from "./local.service";

@Injectable()
export class ApiService {

    headers: HttpHeaders = new HttpHeaders();
    results;

    constructor(
        private http: HttpClient,
        private local: LocalService
    ){
        let authToken = local.getAuthToken();
    
        if(authToken) {
            this.headers.set('Authorization', authToken);
        }
    }

    get(uri:string) {
        return this.http.get(environment.apiUrl+uri,{headers: this.headers});
    }

    post(uri:string, params:any) {
        return this.http.post(environment.apiUrl+uri,params,{headers: this.headers});
    }

    put(uri:string, params:any) {
        return this.http.put(environment.apiUrl+uri,params,{headers: this.headers});
    }

    delete(uri:string) {
        return this.http.delete(environment.apiUrl+uri, {headers: this.headers});
    }
}