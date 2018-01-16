import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../_models/Car';

@Injectable()
export class CarService {
  constructor(private _api :HttpClient) {}   

  index() {
    return this._api.get<Array<Car>>('/cars');
  }

  create(car :Car) {
    return this._api.post<Car>('/Cars', car);
  }

  update(car :Car) {
    return this._api.put<Car>('/Cars/' + car.id, car);
  }

  destroy(id:number) {
    return this._api.delete<boolean>('/Cars/' + id);
  }
}
