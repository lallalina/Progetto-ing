import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TreatmentsService } from 'src/app/core/services/treatments.service';
import { Treatment } from 'src/app/models/treatment.model';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/core/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { DialogTComponent } from './dialog-t/dialog-t.component';
import { UtilsService } from 'src/app/core/services/utils.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  productImage: string | ArrayBuffer;
  prodImageSource: SafeResourceUrl;

  constructor(
    private treatmentsService: TreatmentsService,
    private productService: ProductsService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
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
    });
  }

  initTreatmentsForm() {
    //controllo validità sezioni prodotto
    this.treatmentsForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      prezzo: new FormControl('', Validators.required),
    });
  }

  //converto l'immagine in base 64
  convertImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const self = this;
    reader.onload = function () {
      self.productImage = reader.result;
      self.prodImageSource = self.sanitizer.bypassSecurityTrustResourceUrl(
        reader.result as string
      );
    };
  }

  //--PRODOTTI--
  //aggiungi nuovo prodotto
  addProdotto() {
    this.loadingProds = true;
    this.productService
      .addProdotto({ ...this.productsForm.value, foto: this.productImage })
      .subscribe({
        next: (response) => {
          this.productsForm.reset();
          this.productImage = null;
          this.prodImageSource = null;
          this.products.push(response);
        },
        complete: () => (this.loadingProds = false),
      });
  }

  //cancella prodotto
  deleteProdotto(id: Product['id']) {
    this.loadingProds = true;
    this.productService.deleteProdotto(id).subscribe({
      next: (response) => {
        const prodIndex = this.products.findIndex((item) => item.id === id);
        this.products.splice(prodIndex, 1);
      },
      complete: () => (this.loadingProds = false),
    });
  }

  //dialog per la modifica dei prodotti
  openDialog(product: Product) {
    console.log(product);
    this.dialog.open(DialogComponent, {
      data: product,
      width: '520px',
      height: '520px',
    });
  }

  //--TRATTAMENTI--
  //aggiungi nuovo trattamento
  addTrattamento() {
    this.loadingTreats = true;
    this.treatmentsService.addTreatment(this.treatmentsForm.value).subscribe({
      next: (response) => {
        this.treatments.push(response), this.treatmentsForm.reset();
      },
      complete: () => (this.loadingTreats = false),
    });
  }

  //cancella trattamento
  deleteTreatment(id: Treatment['id']) {
    this.loadingTreats = true;
    this.treatmentsService.deleteTreatment(id).subscribe({
      next: (response) => {
        const treatIndex = this.products.findIndex((item) => item.id === id);
        this.treatments.splice(treatIndex, 1);
      },
      complete: () => (this.loadingTreats = false),
    });
  }

  //dialog per la modifica
  openDialog2(treatment: Treatment) {
    this.dialog.open(DialogTComponent, {
      data: treatment,
      width: '420px',
      height: '420px',
    });
  }
}
