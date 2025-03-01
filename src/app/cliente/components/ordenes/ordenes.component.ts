import { Component } from '@angular/core';
import { ClienteService } from '../../servicio/cliente.service';

@Component({
  selector: 'app-ordenes',
  standalone: false,
  
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.css'
})
export class OrdenesComponent {

  orden:any;

  constructor(private clienteService: ClienteService){}

  ngOnInit(){
    this.recuperarTodasLasOrdenesDelUsuario();
  }

  recuperarTodasLasOrdenesDelUsuario(){
    this.clienteService.recuperarTodasLasOrdenesDelUsuario().subscribe(res=>{
      this.orden = res;
    console.log(this.orden);
    })
  }


}
