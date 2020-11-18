import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  arrayHeroes: HeroeModel[] = [];
  cargando: boolean = false;

  
  constructor(private _heroesService: HeroesService) { }


  ngOnInit(): void {
    this.cargando = true;
    this._heroesService.getHeroes()
      .subscribe( resp=>{
        this.arrayHeroes = resp;
        this.cargando = false;
      } )
  }


  borraHeroe(heroe: HeroeModel, i: number){

    Swal.fire({
      title           : 'Cuidado',
      html            : `Seguro que quieres borrar <b>${heroe.nombre}</b>?`,
      icon            : 'warning',
      confirmButtonText: 'Borrar!',
      showDenyButton  : true,
      denyButtonText  : 'Cancelar',
    })
    .then( (result) =>{
      
      if (result.isConfirmed) {        
        this._heroesService.deleteHeroe(heroe.id).subscribe();          
        /* Con 'splice' eliminamos del array de heroes al heroe en cuestión y Angular actualizará en tiempo real la pagina */
        this.arrayHeroes.splice(i,1);
      }//fin if
    
    });//fin then
    

  }//fin borrarHeroe
  

}
