import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/core/services/review.service';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-responsible-page',
  templateUrl: './responsible-page.component.html',
  styleUrls: ['./responsible-page.component.css'],
})
export class ResponsiblePageComponent implements OnInit {
  reviews: Review[];

  constructor(private reviewService: ReviewService) {}

  //prendi recensioni
  getRecensioni() {
    this.reviewService.recensioniP().subscribe((response) => {
      this.reviews = response;
    });
  }

  ngOnInit(): void {
    this.getRecensioni();
  }
}
