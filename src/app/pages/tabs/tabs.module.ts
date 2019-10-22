import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgCalendarModule } from 'ionic2-calendar';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  
  { path: 'acc',
    component: TabsPage,
    children: [
      { path: 'calendrier', loadChildren: '../calendrier/calendrier.module#CalendrierPageModule' },
      { path: 'reservation', loadChildren: '../reservation/reservation.module#ReservationPageModule' }
    ]
   },
   {
     path: '',
     redirectTo: '/acc/calendrier',
     pathMatch: 'full'
   }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCalendarModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
