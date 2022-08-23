import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrenotazioneComponent } from './components/prenotazione/prenotazione.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainPageComponent, PrenotazioneComponent],
  imports: [CommonModule, MainPageRoutingModule, SharedModule, FormsModule],
})
export class MainPageModule { }
