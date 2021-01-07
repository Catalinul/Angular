import { Injectable } from '@angular/core';
import { ComandaItem } from './comanda-item.model';
import { Comanda } from './comanda.model';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {
  formData!: Comanda;
  comandaIteme!: ComandaItem[]
  constructor() { }
}
