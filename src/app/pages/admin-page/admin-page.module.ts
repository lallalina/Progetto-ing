import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    FormsModule,
    ReactiveFormsModule, SharedModule
  ],
})
export class AdminPageModule {}
