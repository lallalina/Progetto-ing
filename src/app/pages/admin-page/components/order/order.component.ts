import { Component, Input, OnInit } from '@angular/core';
import { Ordine } from 'src/app/models/ordine.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  @Input() orders: Ordine[];

  constructor() {}

  ngOnInit(): void {}
}
