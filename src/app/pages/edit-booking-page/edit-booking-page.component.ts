import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookingService } from 'src/app/core/services/booking.service';

import { booking } from 'src/app/models/booking';

@Component({
  selector: 'app-edit-booking-page',
  templateUrl: './edit-booking-page.component.html',
  styleUrls: ['./edit-booking-page.component.css'],
})
export class EditBookingPageComponent implements OnInit {
  /*variabili*/
  id: booking['id'];
  booking: booking;

  loadingForm: boolean;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadingForm = true;
    this.id = this.route.snapshot.params?.idPrenotazione;
    this.bookingService.getBookingById(this.id).subscribe({
      next: (response) => (this.booking = response),
      complete: () => (this.loadingForm = false),
    });
  }
}
