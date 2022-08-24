import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsiblePageRoutingModule } from './responsible-page-routing.module';
import { ResponsiblePageComponent } from './responsible-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ResponsiblePageComponent],
  imports: [CommonModule, ResponsiblePageRoutingModule, SharedModule],
})
export class ResponsiblePageModule {}
