import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Oferta } from '../_model/Oferta';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  //Url usada para la api usando environment
  private url: string = `${environment.HOST}ofertas`;

  //Constructor con la variable de httpClient
  constructor(private http: HttpClient) { }

  //Cosumir servicio obterner ofertas 
  public obternerOfertas() {
    return this.http.get<Oferta[]>(`${this.url}`);
  }

  //Consumir servicio para obtener una oferta según el Id
  public obtenerOfetaPorId(id:number){
    return this.http.get<Oferta>(`${this.url}/`+id);
  }


  //Servicio para editar una oferta
  public editarOferta(ofertaActualizada:Oferta){
    return this.http.put<any>(`${this.url}`,ofertaActualizada);
  }

  //Sevicio para agregar una nueva oferta
  public agregarOferta(ofertaNueva:Oferta){
    return this.http.post<Oferta>(`${this.url}`,ofertaNueva);
  }

  //Sevicio para para eliminar la oferta según el Id
  public eliminarOFerta(id:number){
    return this.http.delete<any>(`${this.url}/`+id);
  }

}
