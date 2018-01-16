import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { CarService } from '../../../_services/car.service';
import { ModalService } from '../../../_services/modal.service';
import { Car } from '../../../_models/Car';
import { AutoTelematicService } from '../../../_services/auto-telematic.service';
import { MakeModels } from '../../../_etc/makeModels';
import { Customer } from '../../../_models/Customer';

@Component({
  selector: 'new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.scss']
})
export class NewVehicleComponent implements OnInit {
  @Input() customerId: number;
  @Output() onVehicleCreated: EventEmitter<Car> = new EventEmitter<Car>();

  public newVehicleForm: FormGroup;
  public car:Car;
  public makeModels: any;
  public models = [];
  public years = [];

  constructor(
    private _carService: CarService,
    private _autoTelematic: AutoTelematicService,
    private _modalService: ModalService,
    private _fb: FormBuilder
  ) {
    this.makeModels = MakeModels;
    let year = new Date().getFullYear();

    for(var i=1970; i < year+2; i++) {
      this.years.push(i);
    }

  }

  /**
   * Angular --
   * @description sets up the form and allowes the datalists for inputs.
   */
  ngOnInit() {
    this.newVehicleForm = this._fb.group({
      make: [null, [Validators.required]],
      model: [null, [Validators.required]],
      year: [null, [Validators.required]],
      number: [null],
    });

    this.newVehicleForm.controls.make.valueChanges.subscribe( (val) => {
      if(val) {
        for(let make of this.makeModels) {
          if( make.title.toLowerCase() == val.toLowerCase() ) {
            for(let model of make.models){
              this.models.push(model.title);
            }
          }
        }
      }
    });
  }

  /**
   * @function searchNumber
   * @description Sends http request to api to decode vin number and basic car information
   * @returns {void} 
   */
  public searchNumber() :void {
    var controls = this.newVehicleForm.controls;
    let val = controls.number.value;
    this._autoTelematic.decode(val).subscribe( (res:any) => {
      controls.make.setValue(res.data.make);
      controls.model.setValue(res.data.model);
      controls.year.setValue(res.data.year);
    });
  }

  /**
   * @method submit
   * @description Form submition handler, manages the form values and sends them in a http request to the api.
   * @returns {void}
   */
  public submit() : void{
    if(this.newVehicleForm.valid) {
      let newCar = new Car(this.newVehicleForm);
      newCar.customer_id = this.customerId;

      this._carService.create(newCar).subscribe( (car) => {
        let rCar = new Car(car);
        this.onVehicleCreated.emit(rCar);
        this.closeModal();
      });
    }
  }

  /**
   * @method reset
   * @description Resets the form when cancelled or successfully submitted
   * @returns {void}
   */
  private reset() :void {
    this.newVehicleForm.reset();
  }

  /**
   * @function close
   * @description Closes the current Modal and resets the form for later use.
   * @returns {void}
   */
  public closeModal() :void{
    this._modalService.close('newVehicleModal');
    this.newVehicleForm.reset();
  }

}
