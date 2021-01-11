import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComandaItemeComponent } from '../comanda-iteme/comanda-iteme.component';
import { ComandaService } from './../../shared/comanda.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styles: []
})

export class ComandaComponent implements OnInit {

  constructor(public service: ComandaService, public dialog:MatDialog) { }

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


  AdaugaEditeazaItemComanda(comandaItemIndex: any, ComandaID: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true; //previne dialogul de a se inchide atunci cand apasam in afra dialogului
    dialogConfig.width = "50%";
    dialogConfig.data = {comandaItemIndex, ComandaID};
     this.dialog.open(ComandaItemeComponent,dialogConfig);
  };
  
}

 