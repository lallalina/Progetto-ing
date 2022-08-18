import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TreatmentsService } from 'src/app/core/services/treatments.service';
import { Treatment } from 'src/app/models/treatment.model';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-prod-and-treatments',
  templateUrl: './prod-and-treatments.component.html',
  styleUrls: ['./prod-and-treatments.component.css'],
})
export class ProdAndTreatmentsComponent implements OnInit {
  @Input() products: Product[];
  @Input() treatments: Treatment[];

  productsForm: FormGroup;
  treatmentsForm: FormGroup;

  loadingProds: boolean;
  loadingTreats: boolean;

  constructor(
    private treatmentsService: TreatmentsService,
    private productService: ProductsService
  ) { }

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

  //--PRODOTTI--
  //aggiungi nuovo prodotto
  addProdotto() {
    this.loadingProds = true;
    this.productService
      .addProdotto(this.productsForm.value)
      .subscribe({
        next: (response) => {
          this.productsForm.reset()
          this.products.push(response)
        },
        complete: () => this.loadingProds = false
      });
  }

  //cancella prodotto
  deleteProdotto(id: Product['id']) {
    this.loadingProds = true;
    this.productService.deleteProdotto(id)
      .subscribe({
        next: (response) => {
          const prodIndex = this.products.findIndex((item) => item.id === id)
          this.products.splice(prodIndex, 1);
        },
        complete: () => this.loadingProds = false
      });
  }

  //modifica prodotto
  modifyProdotto() {
    this.productService
      .modifyProdotto(this.productsForm.value)
      .subscribe((response) => {
        console.log(response);
      });
  }

  //--TRATTAMENTI--
  //aggiungi nuovo trattamento
  addTrattamento() {
    this.loadingTreats = true;
    this.treatmentsService
      .addTreatment(this.treatmentsForm.value)
      .subscribe({
        next: (response) => this.treatments.push(response),
        complete: () => this.loadingTreats = false
      });
  }

  //cancella trattamento
  deleteTreatment(id: Treatment['id']) {
    this.loadingTreats = true;
    this.treatmentsService
      .deleteTreatment(id)
      .subscribe({
        next: (response) => {
          const treatIndex = this.products.findIndex((item) => item.id === id)
          this.treatments.splice(treatIndex, 1);
        },
        complete: () => this.loadingTreats = false
      });
  }

  //modifica prodotto
  modifyTreatment() {
    this.treatmentsService
      .modifyTreatment(this.productsForm.value)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
