import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPageRoutingModule } from './customer-page-routing.module';
import { CustomerPageComponent } from './customer-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CustomerPageComponent],
  imports: [CommonModule, CustomerPageRoutingModule, SharedModule],
})
export class CustomerPageModule {}
