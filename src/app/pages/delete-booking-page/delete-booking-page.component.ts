import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { booking } from 'src/app/models/booking';

@Component({
  templateUrl: './delete-booking-page.component.html',
  styleUrls: ['./delete-booking-page.component.css'],
})
export class DeleteBookingPageComponent implements OnInit {
  constructor(private bookingService: BookingService) {}

  @Input() booking: booking[];

  ngOnInit(): void {}

  deletePrenotazione(id: booking['id']) {
    this.bookingService.deleteBooking(id).subscribe((response) => {
      /* this.booking = response;*/
    });
  }
}
