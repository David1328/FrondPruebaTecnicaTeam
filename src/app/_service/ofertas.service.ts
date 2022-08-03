import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Oferta } from '../_model/Oferta';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  private url: string = `${environment.HOST}ofertas`;

  constructor(private http: HttpClient,
    private router: Router) { }

  public getAll() {
    console.log(`${this.url}`)
    return this.http.get<Oferta[]>(`${this.url}`);
  }

}
