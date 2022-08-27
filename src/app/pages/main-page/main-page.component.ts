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
  barbers: Barber[] = [];
  treatments: Treatment[] = [];
  reviews: Review[] = [];
  error;

  constructor(private reviewService: ReviewService) {}

  //prendi ultime 3recensioni
  getRecensioni() {
    this.reviewService.recensioni().subscribe((response) => {
      console.log(response);

      console.log(this.reviews);
      // generate a random string
      response.forEach(
        (review) =>
          (review['user'] = `https://avatars.dicebear.com/api/micah/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg?radius=20`)
      );
      this.reviews = response;
      console.log(this.reviews);
    });
  }

  ngOnInit(): void {
    this.getRecensioni();
  }
}
