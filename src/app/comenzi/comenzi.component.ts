import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ComandaService } from '../shared/comanda.service';

@Component({
  selector: 'app-comenzi',
  templateUrl: './comenzi.component.html',
  styles: [
  ]
})
export class ComenziComponent implements OnInit {

  comandaList; //propietate (colectie) definita pentru a putea salva comenzile

  constructor(private service: ComandaService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshLista();
  }

  refreshLista(){
    this.service.getComandaList().then(res => this.comandaList = res);
  }

  deschidePentruEditare(comandaID: number){
  this.router.navigate(['/comanda/edit/' + comandaID])
  }

  comandaStergere(id: number){

    if (confirm('Esti sigur ca vrei sa stergi aceasta comanda?')) {

      this.service.stergeComanda(id).then(res => {
        this.refreshLista();
        this.toastr.warning("Comanda stearsa cu succes!","Restaurant App.");
      });
    }
  }

}
