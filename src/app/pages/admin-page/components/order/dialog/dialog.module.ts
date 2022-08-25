import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DialogComponent } from './dialog.component';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, SharedModule],
})
export class DialogModule {}
