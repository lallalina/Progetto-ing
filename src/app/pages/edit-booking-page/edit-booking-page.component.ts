import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/core/services/booking.service';
import { booking } from 'src/app/models/booking';

@Component({
  selector: 'app-edit-booking-page',
  templateUrl: './edit-booking-page.component.html',
  styleUrls: ['./edit-booking-page.component.css'],
})
export class EditBookingPageComponent implements OnInit {
  constructor(
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  id: booking['id'];
  booking: booking;

  loadingForm: boolean;

  ngOnInit(): void {
    this.loadingForm = true;
    this.id = this.route.snapshot.params?.idPrenotazione;
    this.bookingService.getBookingById(this.id).subscribe({
      next: (response) => (this.booking = response),
      complete: () => (this.loadingForm = false),
    });
  }
}
