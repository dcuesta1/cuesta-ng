import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GLobalEventsManager } from '../_etc/GlobalEventsManager';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/User';
import { LocalService } from '../_services/local.service';

@Component({
  selector: '.loginComponent',
  templateUrl: './login.component.html'
})
export class LoginComponent{

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private globalEventsManager: GLobalEventsManager,
    private local: LocalService
  ) { 

    if(local.getCurrentUser()) {
      this.router.navigate(['/dashboard']);
    }

    this.loginForm = fb.group({
         'email': [null, Validators.required],
         'password': [null, Validators.required]
    });
  }

  login(inputs:any) :void {
    this.authService.authenticate(inputs.email, inputs.password)
      .subscribe(
        (user: User) => {
          this.globalEventsManager.showNavigations(true);
          this.local.SetCurrentUser(user);
          this.router.navigate(['/dashboard']);
        }
      );
  }

  //TODO: register methods
}
