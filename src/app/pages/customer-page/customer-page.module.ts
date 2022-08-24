import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPageRoutingModule } from './customer-page-routing.module';
import { CustomerPageComponent } from './customer-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomerPageComponent, ProductCardComponent],
  imports: [CommonModule, CustomerPageRoutingModule, SharedModule, FormsModule],
})
export class CustomerPageModule { }
