import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPageRoutingModule } from './customer-page-routing.module';
import { CustomerPageComponent } from './customer-page.component';


@NgModule({
  declarations: [
    CustomerPageComponent
  ],
  imports: [
    CommonModule,
    CustomerPageRoutingModule
  ]
})
export class CustomerPageModule { }
