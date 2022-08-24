import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/core/services/booking.service';
import { booking } from 'src/app/models/booking';

@Component({
  templateUrl: './delete-booking-page.component.html',
  styleUrls: ['./delete-booking-page.component.css'],
})
export class DeleteBookingPageComponent implements OnInit {

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  id: booking['id'];

  loading: boolean;

  ngOnInit(): void {
    this.id = this.route.snapshot.params?.idPrenotazione;
  }

  deletePrenotazione() {
    this.loading = true;
    this.bookingService.deleteBooking(this.id).subscribe({
      next: (response) => {
        this.toastr.warning('Prenotazione eliminata');
        this.router.navigate(['/'])
      },
      complete: () => this.loading = false
    })
  }
}
