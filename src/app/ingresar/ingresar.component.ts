import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioLocalStorageService } from '../servicios/usuario-local-storage.service';

@Component({
  selector: 'app-ingresar',
  standalone: false,
  
  templateUrl: './ingresar.component.html',
  styleUrl: './ingresar.component.css'
})
export class IngresarComponent {

  formularioDeIngreso!: FormGroup;

  visibilidadDeContrasena = true;

  constructor( 
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private snackBar: MatSnackBar,
    private router: Router){
  }

  ngOnInit(): void{
    this.formularioDeIngreso = this.formBuilder.group({
      correo: [null, [Validators.required]],
      contrasena :  [null, [Validators.required]],
    })
  }

  
  controlDeVisibilidad () : void{
    this.visibilidadDeContrasena=!this.visibilidadDeContrasena;
  }

  enviarFormulario():void{
 
    const username = this.formularioDeIngreso.get('correo')!.value;
    const password = this.formularioDeIngreso.get('contrasena')!.value;

    this.authService.login(username,password).subscribe(
      (res) =>{
        if(UsuarioLocalStorageService.ingresarComoAdministrador()){
          this.router.navigateByUrl('administrador/Panel Principal');
        }else if(UsuarioLocalStorageService.ingresarComoCliente()){
          this.router.navigateByUrl('cliente/Panel Principal');
        }

      },
      (error)=>{
        this.snackBar.open("Datos Incorrectos","ERROR",{duration:5000});
      }
    )

  }

}
