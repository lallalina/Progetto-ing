import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
})
export class SelectorComponent implements OnInit {
  @Output() changePage = new EventEmitter<string>();

  @Input() currentPage: string;

  constructor() {}

  ngOnInit(): void {}

  emitChangePage(event) {
    this.changePage.emit(event.target.outerText);
  }
}
