import { Component, Input, OnInit } from '@angular/core';
import { Barber } from 'src/app/models/barber.model';

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styleUrls: ['./prenotazione.component.css'],
})
export class PrenotazioneComponent implements OnInit {
  @Input() barbers: Array<Barber>;

  constructor() {}

  ngOnInit(): void {}
}
