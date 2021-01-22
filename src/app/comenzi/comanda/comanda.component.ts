import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ClientService } from 'src/app/shared/client.service';
import { Client } from 'src/app/shared/client.model';
import { ComandaItemeComponent } from '../comanda-iteme/comanda-iteme.component';
import { ComandaService } from './../../shared/comanda.service';


@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styles: []
})

export class ComandaComponent implements OnInit {

  clientList!: Client[];
  isValid: boolean = true;
  
  constructor(public service: ComandaService, 
    public dialog:MatDialog,
    public clientService: ClientService,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit() {

    let comandaID = this.currentRoute.snapshot.paramMap.get('id');

    if (comandaID == null) //operatie de insert
     this.resetForm();
    else  //operatie de update a unei comenzi
    {
      this.service.getComandaById(parseInt(comandaID)).then(res => {
        this.service.formData = res.comanda;
        this.service.comandaIteme = res.comandaDetalii;
      })

    }

    this.clientService.getClientList().then(res => this.clientList = res as Client[]);
  }

  resetForm(form?:NgForm){

    if (form!= null)
      form.resetForm();

    this.service.formData = {
      ComandaID: 0,
      ComandaNr: Math.floor(100000 + Math.random()*900000).toString(), //se face un numar random de 6 cifre
      ClientID: 0,
      MetPlata: '',
      Total: 0,
      ItemeComenziSterseID: ''
    };

    this.service.comandaIteme = [];
  }


  AdaugaEditeazaItemComanda(comandaItemIndex: any, ComandaID: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true; //previne dialogul de a se inchide atunci cand apasam in afra dialogului
    dialogConfig.width = "50%";
    dialogConfig.data = {comandaItemIndex, ComandaID};
    
     this.dialog.open(ComandaItemeComponent,dialogConfig).afterClosed().subscribe( res => {
      this.updateTotal(); //functia va fi apelata de fiecare data cand inchidem dialog-ul de adaugare al prodouselor
     })
  };
  
  StergeItemComanda(comandaItemID: number, i: number){
      if (comandaItemID != null) //daca nu e nul, item-ul respectiv e deja prezent in tabela ComandaIteme
        this.service.formData.ItemeComenziSterseID += comandaItemID + ",";
        
      this.service.comandaIteme.splice(i,1);
      this.updateTotal(); //actualizam totalul comenzii

  }

  updateTotal(){ //functie care actualizeaza totalul comenzii
    this.service.formData.Total = this.service.comandaIteme.reduce( (prev, curr) => {
      return prev + curr.Total;
     },0) //prev este initializat cu 0 si prin functia reduce() o sa adunam toate elementele vectorului in prev

     this.service.formData.Total = parseFloat((this.service.formData.Total).toFixed(2));

  }

  validateForm(){
    this.isValid = true;
    if (this.service.formData.ClientID == 0) // inseamna ca nu e niciun client selectat
      this.isValid = false;
    else if (this.service.comandaIteme.length == 0)
      this.isValid = false;

    return this.isValid;
  }

  onSubmit(form: NgForm){
    if (this.validateForm())
    {
      this.service.salveazaActualizeazaComanda().subscribe( res => {
        this.resetForm();
        this.toastr.success('Comanda trimisa cu succces!', 'Restaurant');
        this.router.navigate(['/comenzi']);
      })
    }
  }

}

 