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
  @Input() set produtc(value: Treatment[]) {
    this.treatmentList = value;
    this.tableData = this.treatmentList;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Treatment,
    private treatmentsService: TreatmentsService
  ) {}

  modifyForm: FormGroup;

  treatmentList: Treatment[];
  tableData: Treatment[];

  ngOnInit(): void {
    this.initModifyForm();
  }

  //controls
  initModifyForm() {
    this.modifyForm = new FormGroup({
      idProdotto: new FormControl(this.data.id),
      nome: new FormControl(this.data.nome),
      prezzo: new FormControl(this.data.prezzo),
    });
  }

  //modifica trattamento
  modifyTreatment() {
    console.log(this.modifyForm.value);
    this.treatmentsService.modifyTreatment(this.modifyForm.value).subscribe({
      next: (response) => {
        this.treatmentList.push(response);
        this.tableData = this.treatmentList;
        console.log(response);
      },
    });
  }
}
