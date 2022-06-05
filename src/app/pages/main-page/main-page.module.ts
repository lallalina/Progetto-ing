import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrenotazioneComponent } from './components/prenotazione/prenotazione.component';
import { ContattiComponent } from './components/contatti/contatti.component';

@NgModule({
  declarations: [MainPageComponent, PrenotazioneComponent, ContattiComponent],
  imports: [CommonModule, MainPageRoutingModule, SharedModule],
})
export class MainPageModule {}
