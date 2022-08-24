import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/core/services/review.service';
import { Review } from 'src/app/models/review.model';

@Component({
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  constructor(private reviewService: ReviewService) {}

  form;
  recensioni: Review;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      voto: new FormControl('', Validators.required),
    });
  }

  doReview() {
    this.reviewService.doReview(this.form.value).subscribe((response) => {
      this.form.reset();
      this.recensioni = response;
    });
  }
}
