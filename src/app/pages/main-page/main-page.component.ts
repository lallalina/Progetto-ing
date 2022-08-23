import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { Barber } from 'src/app/models/barber.model';
import { Review } from 'src/app/models/review.model';
import { Treatment } from 'src/app/models/treatment.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  barbers: Barber[] = [];
  treatments: Treatment[] = [];
  reviews: Review[] = [];
  error;

  constructor(private ajax: AjaxService) { }

  //prendi recensioni
  getRecensioni() {
    this.ajax.recensioni().subscribe((response) => {
      console.log(response);
      this.reviews = response;
    });
  }

  ngOnInit(): void {
    this.getRecensioni();
  }
}
