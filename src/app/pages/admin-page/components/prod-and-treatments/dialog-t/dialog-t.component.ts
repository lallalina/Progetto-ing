import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TreatmentsService } from 'src/app/core/services/treatments.service';

import { Treatment } from 'src/app/models/treatment.model';

@Component({
  selector: 'app-dialog-t',
  templateUrl: './dialog-t.component.html',
  styleUrls: ['./dialog-t.component.css'],
})
export class DialogTComponent implements OnInit {
  /*variabili*/
  @Input() treatments: Treatment[];

  modifyForm: FormGroup;
  loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Treatment,
    private treatmentsService: TreatmentsService
  ) {}

  ngOnInit(): void {
    this.initModifyForm();
  }

  //controls con campi già compilati
  initModifyForm() {
    this.modifyForm = new FormGroup({
      idTrattamento: new FormControl(this.data.id),
      nome: new FormControl(this.data.nome),
      prezzo: new FormControl(this.data.prezzo),
      durata: new FormControl(this.data.durata),
    });
  }

  //modifica trattamento
  modifyTreatment() {
    this.loading = true;
    this.treatmentsService
      .modifyTreatment({ ...this.modifyForm.value })
      .subscribe({
        next: (response) => {
          this.data.nome = response.nome;
          this.data.prezzo = response.prezzo;
          this.data.durata = response.durata;
        },
        complete: () => (this.loading = false),
      });
  }
}
