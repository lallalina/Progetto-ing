import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { BarbersService } from 'src/app/core/services/barbers.service';
import { Barber } from 'src/app/models/barber.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  barbers: Array<Barber>;
  reviews: any;
  error;

  constructor(
    private ajax: AjaxService,
    private barbersService: BarbersService
  ) {}

  //prendi recensioni
  getRecensioni() {
    this.ajax.recensioni().subscribe((response) => {
      console.log(response);
      this.reviews = response;
    });
  }

  ngOnInit(): void {
    //this.getRecensioni();
    this.barbersService.barbers$.subscribe((barbers) => {
      this.barbers = barbers;
    });
  }
}
