import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { TreatmentsService } from 'src/app/core/services/treatments.service';
import { Treatment } from 'src/app/models/treatment.model';

@Component({
  selector: 'app-prod-and-treatments',
  templateUrl: './prod-and-treatments.component.html',
  styleUrls: ['./prod-and-treatments.component.css'],
})
export class ProdAndTreatmentsComponent implements OnInit {
  @Input() products: any[];
  @Input() treatments: Treatment[];

  productsForm: FormGroup;
  treatmentsForm: FormGroup;

  constructor(
    private ajax: AjaxService,
    private treatmentsService: TreatmentsService
  ) {}

  ngOnInit(): void {
    this.initProductsForm();
    this.initTreatmentsForm();
  }

  initProductsForm() {
    //controllo validità sezioni prodotto
    this.productsForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      prezzo: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required),
    });
  }

  initTreatmentsForm() {
    //controllo validità sezioni prodotto
    this.treatmentsForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      prezzo: new FormControl('', Validators.required),
      durata: new FormControl('', Validators.required),
    });
  }

  //aggiungi nuovo prodotto
  addProdotto() {
    this.ajax.addProdotto(this.productsForm.value).subscribe((response) => {
      console.log(response);
      //this.admin = response;
    });
  }

  //aggiungi nuovo trattamento
  addTrattamento() {
    this.treatmentsService
      .addTreatment(this.treatmentsForm.value)
      .subscribe((response) => {
        console.log(response);
        //this.admin = response;
      });
  }

  //cancella prodotto
  //deleteProdotto() {
  //  this.ajax.deleteProdotto(this.productsForm.value).subscribe((response) => {
  //    console.log(response);
  //    //this.admin = response;
  //  });
  //}
}
