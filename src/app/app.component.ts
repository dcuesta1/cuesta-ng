import { Component } from '@angular/core';
import { GLobalEventsManager } from './_etc/GlobalEventsManager';
import { environment } from "../environments/environment"
import { LocalService } from './_services/local.service';

@Component({
  selector: '.appRoot',
  template: `
    <nav class="navbarComp" *ngIf="showNavigations"></nav>
    <div class="row" style="height:100vh">
    <div class="fixed sidebar" id="sidebar" *ngIf="showNavigations"></div>
    <div class="col fluid d-flex flex-column">
      <div class="row flex-grow">
        <router-outlet></router-outlet>
      </div>  
    </div>
  `
})
export class AppComponent {
  showNavigations: boolean = false;

  constructor(
    private globalEventsManager: GLobalEventsManager,
    private local: LocalService
  ){
    if(local.getAuthToken()) {
      this.globalEventsManager.showNavigations(true);
    }

    this.globalEventsManager.showNavEmitter.subscribe((mode)=> {
      this.showNavigations = mode;
    });
  }

}
