import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ComandaItem } from './comanda-item.model';
import { Comanda } from './comanda.model';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {
  formData!: Comanda;
  comandaIteme!: ComandaItem[];

  constructor(private http:HttpClient) { }

  salveazaActualizeazaComanda(){

    var body = { //sintaxa destructure, ca sa adaugam ambele atribute intr-un obiect
      ...this.formData, 
      ComandaItemes: this.comandaIteme
    };

    return this.http.post(environment.apiURL + '/Comanda', body);
  }

  getComandaList(){ //luat din ComandaController.cs
    return this.http.get(environment.apiURL + '/Comanda').toPromise(); 
  }

  getComandaById(id: number) :any { //luat din ComandaController.cs
    return this.http.get(environment.apiURL + '/Comanda/' + id).toPromise(); 
  }
}
