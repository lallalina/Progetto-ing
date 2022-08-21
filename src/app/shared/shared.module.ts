//module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '../core/pipes/pipes.module';

//component
import { FooterComponent } from './components/footer/footer.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TableComponent } from './components/table/table.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';

//material import
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CalendarComponent,
    TableComponent,
    LoaderComponent,
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
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule, //dialog
    MatSlideToggleModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    CalendarComponent,
    TableComponent,
    LoaderComponent,
    PipesModule,
    MatFormFieldModule, //calendar
    MatInputModule,
    MatDatepickerModule, //calendar
    MatIconModule, //per le icone
    MatNativeDateModule,
    MatCardModule, //card
    MatBadgeModule, //cart counter
    MatButtonModule,
    MatDialogModule, //dialog
    MatSlideToggleModule,
  ],
  providers: [MatDatepickerModule],
})
export class SharedModule {}
