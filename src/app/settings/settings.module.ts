import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalSettingsComponent } from './personal-settings/personal-settings.component';
import { IndexSettingsComponent } from './index-settings/index-settings.component';
import { Routes, RouterModule } from '@angular/router';
import { BusinessSettingsComponent } from './business-settings/business-settings.component';
import { ReactiveFormsModule } from '@angular/forms';

/**
 *  TODO: test all possible routes
 */

const SettingsRoutes: Routes = [
  {
    path: 'settings', 
    component: IndexSettingsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'personal' },
      {
          path: 'personal',
          component: PersonalSettingsComponent
      },
      {
          path: 'business',
          component: BusinessSettingsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SettingsRoutes),
    ReactiveFormsModule
  ],
  declarations: [
    PersonalSettingsComponent, 
    IndexSettingsComponent,
    BusinessSettingsComponent
  ]
})
export class SettingsModule { }
