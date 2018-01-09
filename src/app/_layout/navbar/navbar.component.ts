import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { log } from 'util';
import { Router } from '@angular/router';
import { LocalService } from '../../_services/local.service';
import { GLobalEventsManager } from '../../_etc/GlobalEventsManager';

@Component({
  selector: '.navbarComp',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentUser: User;
  notification: number = 0;
  
  constructor(
    private _router :Router,
    private _local :LocalService,
    private _globalEventsManager: GLobalEventsManager
  ) { 
    this.currentUser = new User(_local.getCurrentUser());
  }

  logout() :void {
    this._local.clear();
    this._globalEventsManager.showNavigations(false);
    this._router.navigate(['/']);
  }
}
