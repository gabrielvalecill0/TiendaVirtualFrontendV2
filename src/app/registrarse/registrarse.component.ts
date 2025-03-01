import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  standalone: false,
  
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {


  formularioDeRegistro!: FormGroup;
  contrasenaVisible = true;

  constructor ( private fb: FormBuilder,
                private snackBar: MatSnackBar,
                private authService: AuthService,
                private router : Router
  ){} 

  ngOnInit(): void {
    this.formularioDeRegistro = this.fb.group({
      nombre : [ null, [Validators.required]],
      correo: [null , [Validators.required, Validators.email]],
      contrasena: [null , [Validators.required]],
      confirmarContrasena: [null , [Validators.required]],
    })
  }

  controlDeVisibilidad(){
    this.contrasenaVisible = !this.contrasenaVisible;
  }

  enviarFormulario(): void {
    const password = this.formularioDeRegistro.get('contrasena')?.value;
    const confirmPassword = this.formularioDeRegistro.get('confirmarContrasena')?.value;

    if(password !== confirmPassword){
      this.snackBar.open('La Contraseña No Coincide', 'Close', { duration: 5000, panelClass: 'error-snackbar'});
      return;
    }

    this.authService.register(this.formularioDeRegistro.value).subscribe(
      (response)=>{
        this.snackBar.open("Te Registraste Con Exito", "close", {duration:5000});
        this.router.navigateByUrl("/Ingresar");
      },
      (error)=>{
        this.snackBar.open("Algo No Esta Correcto Con El Registro", "close",{duration:5000 , panelClass: 'error-snackbar'});
      }
    )

  }

}
