import { Component, Input, OnInit } from '@angular/core';
import { Barber } from 'src/app/models/barber.model';
import { Treatment } from 'src/app/models/treatment.model';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { booking } from 'src/app/models/booking';
import { BarbersService } from 'src/app/core/services/barbers.service';
import { TreatmentsService } from 'src/app/core/services/treatments.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  minDate: Date;
  OrariDisponibili = [];
  form;

  constructor(
    private ajax: AjaxService,
    private barbersService: BarbersService,
    private treatmentsService: TreatmentsService
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
    this.form = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  //chiamataOrari
  caricaOrari() {
    this.ajax.orari().subscribe((response) => {
      console.log(response);
      this.bookings = response;
    });
  }

  //Delete weekend
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

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

  //onChange Calendar
  onChange(event) {
    console.log(event);
  }
}
