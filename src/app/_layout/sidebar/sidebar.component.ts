import { Component } from '@angular/core';
import { User } from '../../_models/User';
import { LocalService } from '../../_services/local.service';

@Component({
  selector: '.sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
  `]
})
export class SidebarComponent  {
  public currentUser: User;

  constructor(private _local: LocalService) {
    let currentUser = _local.getCurrentUser();
    this.currentUser = new User(currentUser);
  }
}
