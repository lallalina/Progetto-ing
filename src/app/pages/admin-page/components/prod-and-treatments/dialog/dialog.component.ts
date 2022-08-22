import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/product.model';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductsService,
    private sanitizer: DomSanitizer
  ) { }

  modifyForm: FormGroup;
  productImage: string | ArrayBuffer
  prodImageSource: SafeResourceUrl

  loading: boolean;

  ngOnInit(): void {
    this.initModifyForm();
  }

  //controls con campi già compilati
  initModifyForm() {
    this.productImage = this.data.foto;
    this.prodImageSource = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.foto as string)
    this.modifyForm = new FormGroup({
      idProdotto: new FormControl(this.data.id),
      nome: new FormControl(this.data.nome),
      prezzo: new FormControl(this.data.prezzo),
      descrizione: new FormControl(this.data.descrizione),
    });
  }

  convertImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    const self = this;
    reader.onload = function () {
      self.productImage = reader.result;
      self.prodImageSource = self.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string)
    }
  }


  //modifica prodotto
  modifyProdotto() {
    console.log(this.modifyForm.value);
    this.loading = true;
    this.productService.modifyProdotto({ ...this.modifyForm.value, foto: this.productImage }).subscribe({
      next: (response) => {
        this.data.nome = response.nome;
        this.data.prezzo = response.prezzo;
        this.data.descrizione = response.descrizione;
        this.data.foto = response.foto
      },
      complete: () => this.loading = false
    });
  }
}
