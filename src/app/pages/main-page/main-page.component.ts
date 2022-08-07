import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { BarbersService } from 'src/app/core/services/barbers.service';
import { TreatmentsService } from 'src/app/core/services/treatments.service';
import { Barber } from 'src/app/models/barber.model';
import { Treatment } from 'src/app/models/treatment.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  barbers: Barber[];
  treatments: Array<Treatment>;
  reviews: any;
  error;

  constructor(
    private ajax: AjaxService,
    private barbersService: BarbersService,
    private treatmentsService: TreatmentsService
  ) {}

  //prendi recensioni
  getRecensioni() {
    this.ajax.recensioni().subscribe((response) => {
      console.log(response);
      this.reviews = response;
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

  ngOnInit(): void {
    this.listenToBarbers();
    this.listenToTreatments();
  }
}
