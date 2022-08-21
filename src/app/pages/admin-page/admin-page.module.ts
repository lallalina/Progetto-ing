import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectorComponent } from './components/selector/selector.component';
import { ProdAndTreatmentsComponent } from './components/prod-and-treatments/prod-and-treatments.component';
import { UsersComponent } from './components/users/users.component';
import { DialogComponent } from './components/prod-and-treatments/dialog/dialog.component';
import { DialogTComponent } from './components/prod-and-treatments/dialog-t/dialog-t.component';

@NgModule({
  declarations: [AdminPageComponent, SelectorComponent, ProdAndTreatmentsComponent, UsersComponent, DialogComponent, DialogTComponent],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    FormsModule,
    ReactiveFormsModule, SharedModule
  ],
})
export class AdminPageModule {}
