import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  arrayHeroes: HeroeModel[] = [];
  
  constructor(private _heroesService: HeroesService) { }

  ngOnInit(): void {
    this._heroesService.getHeroes()
      .subscribe( resp=>this.arrayHeroes = resp )
  }
  

}
