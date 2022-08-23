import { Component, Input, OnInit } from '@angular/core';
import { Barber } from 'src/app/models/barber.model';
import { Treatment } from 'src/app/models/treatment.model';

import { BarbersService } from 'src/app/core/services/barbers.service';
import { TreatmentsService } from 'src/app/core/services/treatments.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { booking } from 'src/app/models/booking';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styleUrls: ['./prenotazione.component.css'],
})
export class PrenotazioneComponent implements OnInit {
  @Input() bookings: booking[];
  barbers: Barber[];
  treatments: Array<Treatment>;

  selected: Date | null;

  giorno: string;
  barbiere: Barber;

  minDate: Date;
  OrariDisponibili = [];
  bookingForm: FormGroup;

  constructor(
    private bookingService: BookingService,
    private barbersService: BarbersService,
    private treatmentsService: TreatmentsService,
    private auth: AuthService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.listenToBarbers();
    this.listenToTreatments();
    this.initForm();
  }

  //controllo validità sezioni
  initForm() {
    this.bookingForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      mail: new FormControl('', Validators.required),
    });
  }

  //subscribe barbieri
  listenToBarbers() {
    this.barbersService.barbers$.subscribe((barbers) => {
      console.log(barbers);
      this.barbers = barbers;
    });
  }

  //subscribe trattamenti
  listenToTreatments() {
    this.treatmentsService.treatments$.subscribe((treatments) => {
      this.treatments = treatments;
    });
  }

  //Delete weekend
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  //onChange Calendar
  onChangeData(event) {
    this.giorno = event;
    this.giorno = formatDate(this.giorno, 'dd-MM-yyyy', 'en-US');
    console.log(this.giorno);
    this.caricaOrari(this.giorno, this.barbiere);
  }

  //chiamataOrari
  caricaOrari(giorno = this.giorno, barber = this.barbiere) {
    console.log(this.giorno);
    this.bookingService.orari(barber['id'], giorno).subscribe((response) => {
      console.log(response);
      this.bookings = response;
    });
  }

  //prenota
  prenota() {
    this.bookingService
      .newBooking({ ...this.bookingForm.value, idBarbiere: this.barbiere.id })
      .subscribe((response) => { });
  }
}
