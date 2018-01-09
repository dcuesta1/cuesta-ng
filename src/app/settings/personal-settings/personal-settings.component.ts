import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { LocalService } from '../../_services/local.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../_etc/CustomValidators'
import { AbstractControl, FormControl } from '@angular/forms/src/model';
import { UserService } from '../../_services/user.service';

@Component({
  selector: '.personalsettingscomponent',
  templateUrl: './personal-settings.component.html',
  styleUrls: ['./personal-settings.component.scss']
})
export class PersonalSettingsComponent implements OnInit {
  public currentUser: User;
  public personalInfoForm: FormGroup;
  constructor(
    private _local: LocalService,
    private _fb: FormBuilder,
    private _userService: UserService
  ) { 
    this.currentUser = new User(_local.getCurrentUser());

    this.personalInfoForm = _fb.group({
      'name': [null],
      'email': [null, CustomValidators.emailOrEmpty],
      'password':[null, Validators.minLength(8)],
      'password_confirm': [null, CustomValidators.passwordMatch]
    });

  }

  ngOnInit() {

    let password = this.personalInfoForm.get('password');
    this.personalInfoForm.get('password_confirm').disable();

    password.valueChanges.subscribe(val => {
      if(password.valid && !password.pristine) {
        this.personalInfoForm.controls.password_confirm.enable();
      } else {
        this.personalInfoForm.controls.password_confirm.disable();
      }
    });

    let name = this.personalInfoForm.get('name');
  }

  updatePersonalSettings(input: any) {
    this.currentUser.name = input.name > 0 ? input.name : this.currentUser.name;
    this.currentUser.email = input.email > 0 ? input.email : this.currentUser.email 
    this.currentUser.password = input.password > 0 ? input.name : this.currentUser.password;

    this._userService.update(this.currentUser).subscribe(user => {
      this._local.SetCurrentUser(user);
    });

    this.personalInfoForm.reset();
  }
}
