import { Component, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Car } from '../../../_models/Car';
import { ModalService } from '../../../_services/modal.service';
import { CarService } from '../../../_services/car.service';

@Component({
  selector: 'edit-vehicles',
  templateUrl: './edit-vehicles.component.html',
  styleUrls: ['./edit-vehicles.component.scss']
})
export class EditVehiclesComponent implements OnChanges {
  @Input('cars') cars: Array<Car>;
  @Output() onCarsUpdated: EventEmitter<Array<Car>> = new EventEmitter<Array<Car>>();

  public editCarsForm: FormGroup;
  
  constructor(
    private _modalService: ModalService,
    private _fb: FormBuilder,
    private _carService: CarService
  ) { }

  ngOnChanges() {
   
  }

}
