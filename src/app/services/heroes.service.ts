import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HeroeModel } from './../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  private url = "https://heroescrud-51edb.firebaseio.com";

  constructor( private http: HttpClient ) { }
  
  
  crearHeroe(heroe: HeroeModel){
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        /* se coloca (resp: any) para que acepte el resp.name; si no, no lo reconoce
         * Firebase le llama 'name' al id que viene en la respuesta. */
        map( (resp: any) =>{
          heroe.id = resp.name;
          return heroe;
        })
      );
  }


  actualizarHeroe(heroe: HeroeModel){    
    /* ...heroe ===> Crea un objeto de acuerdo a las propiedades definidas en el modelo */
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    /* La terminación en .json es propio de Firebaes, con otro backend no haría falta. */
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }



  getHeroes(){
    return this.http.get(`${ this.url }/heroes.json`)
      .pipe(
        /* el map tal y como está, le está mandando como PARAMETRO la respuesta.
        Esta es una version mas corta. 
        De la forma larga funcionaría igualmente */
        map( this.crearArray ),
        delay(1500)
      )
  }



  /* Tuvimos que crear esta función porque los objetos no son iterables en un ngFor.
   * Esta función transforma los objetos en un array.
   * Lo que llega por parametro, son los heroes version Objeto, que es la respuesta
   * del map. */
  private crearArray(heroesObj: object){

    const heroesArray: HeroeModel[] = [];

    if (heroesObj === null) { return []; }

    Object.keys( heroesObj ).forEach( key =>{
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroesArray.push( heroe );
    });
    // console.log(heroesArray);
    return heroesArray;
  }

  

  getHeroe(id: string){
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }


  deleteHeroe(id: string){
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }

}
