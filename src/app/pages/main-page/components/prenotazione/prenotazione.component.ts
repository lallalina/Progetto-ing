import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { BarbersService } from 'src/app/core/services/barbers.service';
import { TreatmentsService } from 'src/app/core/services/treatments.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from 'src/app/core/services/utils.service';

import { Barber } from 'src/app/models/barber.model';
import { Treatment } from 'src/app/models/treatment.model';
import { booking } from 'src/app/models/booking';

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styleUrls: ['./prenotazione.component.css'],
})
export class PrenotazioneComponent implements OnInit {
  /*variabili*/
  @Input() isHome: boolean;

  barbers: Barber[];
  treatments: Array<Treatment>;
  orari: Array<string[]>;
  giorno: string;
  barbiere: Barber;

  private _bookingToEdit: booking;

  get bookingToEdit(): booking {
    return this._bookingToEdit;
  }

  @Input() set bookingToEdit(value: booking) {
    this._bookingToEdit = value;
    if (this.bookingToEdit) {
      this.giornoSelezionato = this.bookingToEdit.startTime;
      this.barbiere = this.bookingToEdit.barbiere;
      const _giorno = new Date(
        this.bookingToEdit.startTime
      ).toLocaleDateString();
      this.giorno = formatDate(_giorno, 'dd-MM-yyyy', 'en-US');
      this.caricaOrari(this.giorno, this.bookingToEdit.barbiere);
    }
  }

  giornoSelezionato: Date | null;
  periodoSelezionato: string[];
  minDate: Date;
  OrariDisponibili = [];

  trattamentiSelezionati: number[] = [];

  bookingForm: FormGroup;
  loadingRes: boolean;

  constructor(
    private bookingService: BookingService,
    private barbersService: BarbersService,
    private treatmentsService: TreatmentsService,
    private toastr: ToastrService,
    private utils: UtilsService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.listenToBarbers();
    this.listenToTreatments();
    this.initForm();
  }

  //eliminazione weekend e lunedì dal calendario
  calendarDatesFilter = (d: Date): boolean => {
    const day = d.getDay();
    /* Prevent Saturday and Sunday for select. */
    return day !== 0 && day !== 6 && day !== 1;
  };

  //controllo validità sezioni
  initForm() {
    this.bookingForm = new FormGroup({
      nome: new FormControl(
        this.bookingToEdit ? this.bookingToEdit.nome : '',
        Validators.required
      ),
      mail: new FormControl(
        this.bookingToEdit ? this.bookingToEdit.mail : '',
        Validators.required
      ),
    });
  }

  //subscribe barbieri
  listenToBarbers() {
    this.barbersService.barbers$.subscribe((barbers) => {
      this.barbers = barbers;
    });
  }

  //subscribe trattamenti
  listenToTreatments() {
    this.treatmentsService.treatments$.subscribe((treatments) => {
      this.treatments = treatments;
    });
  }

  //onChange Calendar
  onChangeData(event) {
    this.giorno = event;
    this.giorno = formatDate(this.giorno, 'dd-MM-yyyy', 'en-US');
    this.caricaOrari(this.giorno, this.barbiere);
  }

  //get trattamenti
  onTreatmentChecked(checked: boolean, treatment: Treatment) {
    if (checked) {
      this.trattamentiSelezionati.push(treatment.id);
    } else {
      const exists = this.trattamentiSelezionati.includes(treatment.id);
      if (exists) {
        const index = this.trattamentiSelezionati.findIndex(
          (elem) => elem === treatment.id
        );
        this.trattamentiSelezionati.splice(index, 1);
      }
    }
  }

  //chiamataOrari
  caricaOrari(giorno: string, barber: Barber) {
    if (barber) {
      this.bookingService.orari(barber.id, giorno).subscribe((response) => {
        this.orari = response;
      });
    }
  }

  //trasformo in stringa una i vari trattamenti
  arrayToString(array: number[]): string {
    let stringArray = '';
    array.forEach((elem, index) => {
      stringArray += elem;
      if (index !== array.length - 1) {
        stringArray += ',';
      }
    });
    return stringArray;
  }

  //prenota
  prenota() {
    this.loadingRes = true;
    if (this.barbiere && this.giornoSelezionato && this.periodoSelezionato) {
      const date = new Date(this.giornoSelezionato);
      const dateString = `${formatDate(
        date.toISOString(),
        'dd/MM/yyyy',
        'en-US'
      )} ${this.periodoSelezionato[0]}`;

      /*in caso di modifica prenotazione*/
      if (this.bookingToEdit) {
        this.bookingService
          .editBooking({
            ...this.bookingForm.value,
            idPrenotazione: this.bookingToEdit.id,
            idBarbiere: this.barbiere.id,
            startTime: dateString,
            trattamenti: this.arrayToString(this.trattamentiSelezionati),
          })
          .subscribe({
            next: (response) => {
              this.toastr.success('Prenotazione modificata con successo');
              this.utils.reloadCalendar.next();
            },
            complete: () => (this.loadingRes = false),
          });
      } else {
        /*nuova prenotazione*/
        this.bookingService
          .newBooking({
            ...this.bookingForm.value,
            idBarbiere: this.barbiere.id,
            startTime: dateString,
            trattamenti: this.arrayToString(this.trattamentiSelezionati),
          })
          .subscribe({
            next: (response) => {
              this.toastr.success('Prenotazione avvenuta con successo');
              this.utils.reloadCalendar.next();
              this.bookingForm.reset();
              this.barbiere = null;
              this.giornoSelezionato = null;
              this.periodoSelezionato = null;
            },
            complete: () => (this.loadingRes = false),
          });
      }
    }
  }
}
