import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReviewService } from 'src/app/core/services/review.service';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-responsible-page',
  templateUrl: './responsible-page.component.html',
  styleUrls: ['./responsible-page.component.css'],
})
export class ResponsiblePageComponent implements OnInit {
  user: User
  reviews: Review[];

  constructor(private reviewService: ReviewService, private auth: AuthService) { }

  //prendi recensioni
  getRecensioni() {
    this.reviewService.recensioniP(this.user.id).subscribe((response) => {
      this.reviews = response;
    });
  }

  ngOnInit(): void {
    this.user = this.auth.user;
    this.getRecensioni();
  }
}
