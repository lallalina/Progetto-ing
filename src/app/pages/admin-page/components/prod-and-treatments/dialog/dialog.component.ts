import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/product.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  @Input() product: Product[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductsService
  ) {}

  modifyForm: FormGroup;

  ngOnInit(): void {
    this.initModifyForm();
  }

  //controls con campi già compilati
  initModifyForm() {
    this.modifyForm = new FormGroup({
      idProdotto: new FormControl(this.data.id),
      nome: new FormControl(this.data.nome),
      prezzo: new FormControl(this.data.prezzo),
      descrizione: new FormControl(this.data.descrizione),
      file: new FormControl(''),
    });
  }

  //modifica prodotto
  modifyProdotto() {
    console.log(this.modifyForm.value);
    this.productService.modifyProdotto(this.modifyForm.value).subscribe({
      next: (response) => {
        this.data.nome = response.nome;
        this.data.prezzo = response.prezzo;
        this.data.descrizione = response.descrizione;
      },
    });
  }
}
