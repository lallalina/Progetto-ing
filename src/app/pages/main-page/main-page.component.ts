import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/core/services/ajax.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  reviews: any;
  error;

  constructor(private ajax: AjaxService) {}

  //prendi recensioni
  getRecensioni() {
    this.ajax.recensioni().subscribe(
      (response) => {
        console.log(response);
        this.reviews = response;
      },
      (error) => {
        alert('Non ci sono recensioni qui');
        this.error = error;
      }
    );
  }

  ngOnInit(): void {
    this.getRecensioni();
  }
}
