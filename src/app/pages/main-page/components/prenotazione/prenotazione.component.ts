import { Component, Input, OnInit } from '@angular/core';
import { Barber } from 'src/app/models/barber.model';
import { Treatment } from 'src/app/models/treatment.model';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { booking } from 'src/app/models/booking';

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styleUrls: ['./prenotazione.component.css'],
})
export class PrenotazioneComponent implements OnInit {
  @Input() barbers: Barber[];
  @Input() bookings: booking[];
  @Input() treatments: Array<Treatment>;

  minDate: Date;
  OrariDisponibili = [];

  constructor(private ajax: AjaxService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
  }

  //chiamataOrari
  caricaOrari() {
    this.ajax.orari().subscribe((response) => {
      console.log(response);
      this.bookings = response;
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  ngOnInit(): void {}
}
