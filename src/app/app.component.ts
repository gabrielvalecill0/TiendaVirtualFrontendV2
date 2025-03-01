import { Component } from '@angular/core';
import { UsuarioLocalStorageService } from './servicios/usuario-local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'EcommerceAngular';

  ingresarComoCliente : boolean = UsuarioLocalStorageService.ingresarComoCliente();
  ingresarComoAdministrador : boolean = UsuarioLocalStorageService.ingresarComoAdministrador();

  constructor (private router: Router){
  } 

  ngOnInit():void {
    this.router.events.subscribe(event =>{
      this.ingresarComoCliente = UsuarioLocalStorageService.ingresarComoCliente();
      this.ingresarComoAdministrador = UsuarioLocalStorageService.ingresarComoAdministrador();
    })
  }

  desconectar(){
    UsuarioLocalStorageService.desconectar();
    this.router.navigateByUrl('Ingresar');

  }
}
