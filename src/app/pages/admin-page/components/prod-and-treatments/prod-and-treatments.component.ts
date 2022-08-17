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
    this.productService
      .addProdotto(this.productsForm.value)
      .subscribe((response) => {
        this.productsForm.reset();
        this.products.push(response); //this.admin = response;
      });
  }

  //cancella prodotto
  deleteProdotto(id: Product['id']) {
    this.productService.deleteProdotto(id)
      .subscribe((response) => {
        const prodIndex = this.products.findIndex((item) => item.id === id)
        this.products.splice(prodIndex, 1);
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
    this.treatmentsService
      .addTreatment(this.treatmentsForm.value)
      .subscribe((response) => {
        console.log(response);
        this.treatments.push(response);
      });
  }

  //cancella trattamento
  deleteTreatment(id: Treatment['id']) {
    this.treatmentsService
      .deleteTreatment(id)
      .subscribe((response) => {
        const treatIndex = this.products.findIndex((item) => item.id === id)
        this.products.splice(treatIndex, 1);
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
