import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsiblePageRoutingModule } from './responsible-page-routing.module';
import { ResponsiblePageComponent } from './responsible-page.component';


@NgModule({
  declarations: [
    ResponsiblePageComponent
  ],
  imports: [
    CommonModule,
    ResponsiblePageRoutingModule
  ]
})
export class ResponsiblePageModule { }
