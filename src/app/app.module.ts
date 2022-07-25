import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from './core/services/utils.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';
import { AdminPageModule } from './pages/admin-page/admin-page.module';
import { CustomerPageModule } from './pages/customer-page/customer-page.module';
import { ResponsiblePageModule } from './pages/responsible-page/responsible-page.module';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, //chiamate http
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatIconModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [UtilsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
