import { Component, OnInit } from '@angular/core';

import { ReviewService } from 'src/app/core/services/review.service';

import { Barber } from 'src/app/models/barber.model';
import { Review } from 'src/app/models/review.model';
import { Treatment } from 'src/app/models/treatment.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  /*variabili*/
  barbers: Barber[] = [];
  treatments: Treatment[] = [];
  reviews: Review[] = [];
  error;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.getRecensioni();
  }

  //prendi ultime 3recensioni
  getRecensioni() {
    this.reviewService.recensioni().subscribe((response) => {
      console.log(response);
      this.reviews = response;
      console.log('ciao');
      console.log(this.reviews);
    });
  }
}
