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

  currentUser: User = JSON.parse(localStorage.getItem('user'));
  notification: number = 0;
  
  constructor(
    private router :Router,
    private local :LocalService,
    private globalEventsManager: GLobalEventsManager
  ) { }

  logout() :void {
    this.local.clear();
    this.globalEventsManager.showNavigations(false);
    this.router.navigate(['/']);
  }
}
