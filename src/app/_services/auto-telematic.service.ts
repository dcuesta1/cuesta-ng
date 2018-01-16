import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AutoTelematicService {

  constructor(private _api: HttpClient) { }
  decode(number: string) {
    return this._api.get('/auto/decode/'+number);
  }
}
