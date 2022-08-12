import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TableComponent } from './components/table/table.component';
import { PipesModule } from '../core/pipes/pipes.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CalendarComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    PipesModule,
    MatFormFieldModule,
    MatInputModule, //calendar
    MatDatepickerModule, //calendar
    MatNativeDateModule,
    MatIconModule, //per le icone
    MatCardModule, //card
    MatBadgeModule, //cart counter
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    CalendarComponent,
    TableComponent,
    PipesModule,
    MatFormFieldModule, //calendar
    MatInputModule,
    MatDatepickerModule, //calendar
    MatIconModule, //per le icone
    MatNativeDateModule,
    MatCardModule, //card
    MatBadgeModule, //cart counter
  ],
  providers: [MatDatepickerModule],
})
export class SharedModule {}
