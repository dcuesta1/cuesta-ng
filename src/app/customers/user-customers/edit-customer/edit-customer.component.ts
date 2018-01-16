import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Customer } from '../../../_models/Customer';
import { CustomValidators } from '../../../_etc/CustomValidators'
import {states, st} from '../../../_etc/formHelpers';
import { ModalService } from '../../../_services/modal.service';
import { CustomerService } from '../../../_services/customer.service';

@Component({
    selector: 'edit-customer',
    templateUrl: './edit-customer.component.html',
    styleUrls: ['./edit-customer.component.scss'],
})

export class EditUserComponent implements OnChanges {
    @Input() customer: Customer;
    @Output() onCustomerUpdated: EventEmitter<Customer> = new EventEmitter<Customer>();

    public editCustomerForm: FormGroup;
    public states : any;
    public st : any;
    
    constructor(
        private _fb: FormBuilder,
        private _modalService: ModalService,
        private _customerService: CustomerService
    ){
        this.states = states;
        this.st = st;
    }

    ngOnChanges() {
        this.editCustomerForm = this._fb.group({
            'first_name': [this.customer.first_name, [Validators.minLength(3)]],
            'last_name': [this.customer.last_name, [Validators.minLength(3)]],
            'phone': [this.customer.phone],
            'email': [this.customer.email, [CustomValidators.emailOrEmpty]],
            'address_one': [this.customer.address_one],
            'address_two': [this.customer.address_two],
            'city': [this.customer.city],
            'state': [this.customer.state]
        });

        //TODO: find a shorter way to achieve the same
        this.editCustomerForm.controls.first_name.valueChanges.subscribe( (value:any) => {
            if(value == this.customer.first_name) {
                this.editCustomerForm.controls.first_name.markAsPristine();
            }
        });

        this.editCustomerForm.controls.last_name.valueChanges.subscribe( (value:any) => {
            if(value == this.customer.last_name) {
                this.editCustomerForm.controls.last_name.markAsPristine();
            }
        });

        this.editCustomerForm.controls.phone.valueChanges.subscribe( (value:any) => {
            if(value == this.customer.phone) {
                this.editCustomerForm.controls.phone.markAsPristine();
            }
        });

        this.editCustomerForm.controls.email.valueChanges.subscribe( (value:any) => {
            if(value == this.customer.email) {
                this.editCustomerForm.controls.email.markAsPristine();
            }
        });

        this.editCustomerForm.controls.address_one.valueChanges.subscribe( (value:any) => {
            if(value == this.customer.address_one) {
                this.editCustomerForm.controls.address_one.markAsPristine();
            }
        });

        this.editCustomerForm.controls.address_two.valueChanges.subscribe( (value:any) => {
            if(value == this.customer.address_two) {
                this.editCustomerForm.controls.address_two.markAsPristine();
            }
        });

        this.editCustomerForm.controls.city.valueChanges.subscribe( (value:any) => {
            if(value == this.customer.city) {
                this.editCustomerForm.controls.city.markAsPristine();
            }
        });

        this.editCustomerForm.controls.state.valueChanges.subscribe( (value:any) => {
            if(value == this.customer.state) {
                this.editCustomerForm.controls.state.markAsPristine();
            }
        });
    }

    submit() {
        if(this.editCustomerForm.valid){
           let updatedCustomer = new Customer(this.editCustomerForm.value);
           updatedCustomer.id = this.customer.id;

           this._customerService.update(updatedCustomer).subscribe( (customer) => {
               customer = new Customer(customer);
               customer.cars = this.customer.cars; 
               customer.invoices = this.customer.invoices;
               this.onCustomerUpdated.emit(customer);
               this.closeModal();
           });
        }
    }

    private reset() {
        this.editCustomerForm.reset({
            first_name: this.customer.first_name,
            last_name: this.customer.last_name,
            phone: this.customer.phone,
            email: this.customer.email,
            address_one: this.customer.address_one,
            address_two: this.customer.address_two,
            city: this.customer.city,
            state: this.customer.state
        });
    }

    public closeModal(){
        this._modalService.close('editCustomerModal');
        this.reset();
    }
}