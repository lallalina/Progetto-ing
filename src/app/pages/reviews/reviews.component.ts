import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/core/services/review.service';
import { Review } from 'src/app/models/review.model';
import { ToastrService } from 'ngx-toastr';
import { booking } from 'src/app/models/booking';

@Component({
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  form;
  recensioni: Review;

  id: booking['id'];
  loading: boolean;

  ngOnInit(): void {
    this.initForm();
    this.id = this.route.snapshot.params?.idPrenotazione;
  }

  initForm() {
    this.form = new FormGroup({
      valutazione: new FormControl('', Validators.required),
      descrizione: new FormControl('')
    });
  }

  doReview() {
    this.loading = true;
    this.reviewService.doReview({ ...this.form.value, idPrenotazione: this.id }).subscribe({
      next: (response) => {
        this.toastr.success('Recensione effettuata');
        /* this.router.navigate(['/']);*/
        this.form.value = response;
        console.log(response);
      },
      complete: () => {
        this.form.reset();
        this.loading = false;
      },
    });
  }
}
