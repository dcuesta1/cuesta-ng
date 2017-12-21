import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { log } from 'util';

@Component({
  selector: '.navbarComp',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentUser: User = JSON.parse(localStorage.getItem('user'));
  notification: number = 0;
  
}
