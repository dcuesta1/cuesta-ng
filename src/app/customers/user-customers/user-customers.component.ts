import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { LocalService } from "../../_services/local.service"

@Component({
  selector: '.userscustomerscomponent',
  templateUrl: './user-customers.component.html',
  styleUrls: ['./user-customers.component.scss']
})
export class UserCustomersComponent {
  private currentUser: User;

  constructor(
    private _local :LocalService,
  ) { 
    this.currentUser = new User(_local.getCurrentUser());
  }

}
