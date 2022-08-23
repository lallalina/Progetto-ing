import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { reviews } from 'src/app/models/review.model';

@Component({
  selector: 'app-responsible-page',
  templateUrl: './responsible-page.component.html',
  styleUrls: ['./responsible-page.component.css'],
})
export class ResponsiblePageComponent implements OnInit {
  reviews: reviews[];

  constructor(private ajax: AjaxService) {}

  //prendi recensioni
  getRecensioni() {
    this.ajax.recensioniP().subscribe((response) => {
      this.reviews.push(response);
    });
  }

  ngOnInit(): void {
    this.getRecensioni();
  }
}
