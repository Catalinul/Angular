import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NgForm } from '@angular/forms';

import { ComandaService } from 'src/app/shared/comanda.service';
import { ComandaItem } from 'src/app/shared/comanda-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';


@Component({
  selector: 'app-comanda-iteme',
  templateUrl: './comanda-iteme.component.html',
  styles: [
  ]
})
export class ComandaItemeComponent implements OnInit {

  formData!: ComandaItem;
  itemList!: Item[]; //folosit pentru a populara lista cu produse
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data, //pentru a folosi constanta 
    public MatDialogRef: MatDialogRef<ComandaItemeComponent>,
    private itemService: ItemService,
    private comandaService: ComandaService) { }

  ngOnInit(): void {

    //functie callback
    this.itemService.getItemList().then(res => this.itemList = res as Item[]);

    // daca this.data contine date pe care le-am trimis din comanda.component.ts (functia AdaugaEditeazaItem)
    // pentru un item existent, valoarea indexului va fi 0 sau mai mare. in cazul unui item nou, valoarea va fi null
    if (this.data.comandaItemIndex == null)  //daca e null, resetam valoarile
      this.formData = {
        ComandaItemID: 0,
        ComandaID: this.data.comandaID,
        ItemID: 0,
        ItemNume: '',
        Pret: 0,
        Cantitate: 0,
        Total: 0
      }
    else 
      { //trebuie sa asignam elemntul corespunzator din tabela produselor din comanda, pe care le-am stocat in comanda.service, in vectorul comandaIteme
        this.formData = Object.assign({},this.comandaService.comandaIteme[this.data.comandaItemIndex]); 
        //mai sus am facut o copie la obiectul care asigneaza, ca sa putem lucra cu o copie a datelor atunci cand adauga iteme in formular,
        //astfel incat produsele din tabela sa se modfice doar cand se apasa submit
      }
  }

  updatePrice(ctrl){ //alege pretul corespunzator pentru item-ul selectat
    if (ctrl.selectedIndex == 0){
      this.formData.Pret = 0;
      this.formData.ItemNume = '';
    } else {
      this.formData.Pret = this.itemList[ctrl.selectedIndex - 1].Price;
      this.formData.ItemNume = this.itemList[ctrl.selectedIndex - 1].Nume;
    }
    this.updateTotal(); //ca sa se actualizeze totalul si atunci cand se selecteaza alt produs
  }

  updateTotal(){ //face update la pretul total al unui produs din comanda
    this.formData.Total = parseFloat((this.formData.Cantitate * this.formData.Pret).toFixed(2));
  }

  onSubmit(form: NgForm){ //actualizeaza comanda
    if (this.validateForm(form.value)){
      if (this.data.comandaItemIndex == null)
         this.comandaService.comandaIteme.push(form.value);
      else
        this.comandaService.comandaIteme[this.data.comandaItemIndex] = form.value;
        
    this.MatDialogRef.close();
    }
  }

  validateForm(formData:ComandaItem){
    this.isValid = true;

    if (formData.ItemID == 0)
      this.isValid = false;
    else if (formData.Cantitate == 0)
      this.isValid = false;

    return this.isValid;
  }
}
