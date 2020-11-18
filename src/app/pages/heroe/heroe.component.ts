import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HeroeModel } from './../../models/heroe.model';
import { HeroesService } from './../../services/heroes.service';
/* sweetalert2 => para alerts personalizados */
import  Swal  from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel;
  
  constructor( private _heroesService: HeroesService,
              private route: ActivatedRoute ) { }
  
  ngOnInit(): void {
    /* Esta es otra manera de obtener datos sin necesidad de 'suscribirnos'
    NO LA ENTIENDO MUCHO. Creo que coge de la url el ultimo parametro. */
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this._heroesService.getHeroe( id )
        .subscribe((resp: HeroeModel) =>{
          this.heroe = resp;
          this.heroe.id = id;
          console.log(this.heroe);
        });
    }
  }
  
  
  guardar(form: NgForm){
    //VARIABLES
    let peticion: Observable<any>;
    
    if (form.invalid) {
      console.log("---- FORMULARIO NO VALIDO ----");
      Swal.fire({
        icon  : 'error',
        title : 'Error!',
        text  : 'Debes llenar todos los campos'
      })
      return;
    }

    Swal.fire({
      icon  : 'info',
      title : 'Espere',
      text  : 'Guardando información',
      // allowOutsideClick: false
    });
    Swal.showLoading();

    
    if (this.heroe.id) {
      peticion = this._heroesService.actualizarHeroe( this.heroe );
    }else{
      peticion = this._heroesService.crearHeroe( this.heroe );
        // .subscribe( resp =>{
        //   console.log("Respuesta de crear: %O",resp);
        // });
    }

    peticion.subscribe( resp=>{
      Swal.fire({
        title : this.heroe.nombre,
        text  : 'Se actualizó correctamente',
        icon  : 'success'
      });
    });
    

  }



}
