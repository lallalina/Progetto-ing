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

  constructor(private ajax: AjaxService) {}

  //prendi recensioni
  getRecensioni() {
    this.ajax.recensioni().subscribe((response) => {
      console.log(response);
      this.reviews = response;
    });
  }

  ngOnInit(): void {}
}
