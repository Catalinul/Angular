import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router) { }

  ngOnInit(): void {
    this.service.getComandaList().then(res => this.comandaList = res);
  }

  deschidePentruEditare(comandaID: number){
  this.router.navigate(['/comanda/edit/' + comandaID])
  }
}
