import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PrenotazioneComponent } from './prenotazione/prenotazione.component';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { AdminComponent } from './admin/admin.component';
import { ContattiComponent } from './contatti/contatti.component';
import { LoginComponent } from './login/login.component';

import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from './utils.service';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PrenotazioneComponent,
    ProdottiComponent,
    AdminComponent,
    ContattiComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, //chiamate http
    MatFormFieldModule, 
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [UtilsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
