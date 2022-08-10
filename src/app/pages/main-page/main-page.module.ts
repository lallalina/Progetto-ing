import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrenotazioneComponent } from './components/prenotazione/prenotazione.component';

@NgModule({
  declarations: [MainPageComponent, PrenotazioneComponent],
  imports: [CommonModule, MainPageRoutingModule, SharedModule],
})
export class MainPageModule {}
