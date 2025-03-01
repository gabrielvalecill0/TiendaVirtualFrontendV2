import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from '../../servicio/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RealizarOrdenComponent } from '../realizar-orden/realizar-orden.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: false,

  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  orden: any;
  isEmpty: boolean = true; // Propiedad para verificar si el carrito está vacío

  constructor(
    private clienteService: ClienteService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.recuperarOrdenPendiente();
  }

  recuperarOrdenPendiente() {
    this.clienteService.recuperarOrdenPendienteDelUsuario().subscribe(res => {
      this.orden = res;
      console.log(this.orden)
      this.isEmpty = !this.orden || this.orden.length === 0; // Verifica si la orden está vacía
    });
  }

  getImgSrc(): string {
    return 'data:image/png;base64,' + this.orden.img; // Asegúrate de que 'img' sea un string base64
  }


  realizarOrden() {
    this.dialog.open(RealizarOrdenComponent);
  }

  borrarOrden() {
    this.clienteService.borrarOrden(this.orden.id).subscribe(
      response => {
        console.log(response); // Maneja la respuesta aquí
        this.router.navigateByUrl("/cliente/Panel Principal");
      },
      error => {
        console.error("Error al eliminar la orden", error); // Manejo de errores
        alert("No se pudo eliminar la orden. Intente nuevamente."); // Mensaje al usuario
      }
    );
  }

}
