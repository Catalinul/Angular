import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ComandaService } from './../../shared/comanda.service';



@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styles: []
})

export class ComandaComponent implements OnInit {

  constructor(public service: ComandaService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm){

    if (form!= null)
      form.resetForm();

    this.service.formData = {
      ComandaID: 0,
      ComandaNr: Math.floor(100000 + Math.random()*900000).toString(), //se face un numar random de 6 cifre
      ClientID: 0,
      MetPlata: '',
      Total: 0
    };

    this.service.comandaIteme = [];
  }
}

// AdaugaEditeazaItemComanda(comandaItemIndex, ComandaID){

// };