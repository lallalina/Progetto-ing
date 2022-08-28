import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Barber } from 'src/app/models/barber.model';
import { Treatment } from 'src/app/models/treatment.model';

import { BarbersService } from 'src/app/core/services/barbers.service';
import { TreatmentsService } from 'src/app/core/services/treatments.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { booking } from 'src/app/models/booking';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styleUrls: ['./prenotazione.component.css'],
})
export class PrenotazioneComponent implements OnInit {
  @Input() isHome: boolean;

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

  barbers: Barber[];
  treatments: Array<Treatment>;
  orari: Array<string[]>;

  giornoSelezionato: Date | null;

  giorno: string;
  barbiere: Barber;
  periodoSelezionato: string[];
  trattamentiSelezionati: number[] = [];

  minDate: Date;
  OrariDisponibili = [];
  bookingForm: FormGroup;

  loadingRes: boolean;

  calendarDatesFilter = (d: Date): boolean => {
    const day = d.getDay();
    /* Prevent Saturday and Sunday for select. */
    return day !== 0 && day !== 6 && day !== 1;
  };

  constructor(
    private bookingService: BookingService,
    private barbersService: BarbersService,
    private treatmentsService: TreatmentsService,
    private toastr: ToastrService,
    private utils: UtilsService,
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
    console.log(this.trattamentiSelezionati);
  }

  //chiamataOrari
  caricaOrari(giorno: string, barber: Barber) {
    console.log(this.giorno);
    if (barber) {
      this.bookingService.orari(barber.id, giorno).subscribe((response) => {
        console.log(response);
        this.orari = response;
      });
    }
  }

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
              console.log(response);
              this.toastr.success('Prenotazione modificata con successo');
              this.utils.reloadCalendar.next();
            },
            complete: () => (this.loadingRes = false),
          });
      } else {
        this.bookingService
          .newBooking({
            ...this.bookingForm.value,
            idBarbiere: this.barbiere.id,
            startTime: dateString,
            trattamenti: this.arrayToString(this.trattamentiSelezionati),
          })
          .subscribe({
            next: (response) => {
              console.log(response);
              this.toastr.success('Prenotazione avvenuta con successo');
              this.utils.reloadCalendar.next();
            },
            complete: () => (this.loadingRes = false),
          });
      }
    }
  }
}
