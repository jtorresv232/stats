import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-alumnos-lista',
  templateUrl: './alumnos-lista.component.html',
  styleUrls: ['./alumnos-lista.component.css']
})
export class AlumnosListaComponent implements OnInit {

	public alumnos = [];

  constructor(private _service: StatsService) {
  }

  ngOnInit() {
  	this._service.getAlumnos()
  	.subscribe(data => this.alumnos = data);
  }

}
