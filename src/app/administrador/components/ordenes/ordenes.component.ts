import { Component } from '@angular/core';
import { AdministradorService } from '../../servicios/administrador.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ordenes',
  standalone: false,

  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.css'
})
export class OrdenesComponent {

  orders: any;

  constructor(private adminService: AdministradorService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.recuperarOrdenesRealizadas();
  }

  recuperarOrdenesRealizadas() {
    this.adminService.recuperarOrdenesRealizadas().subscribe(res => {
      this.orders = res;
    })
  }

  cambiarEstadoDeOrden(idOrden: number, estadoDeOrden: string) {
    const cambiarElEstadoDeLaOrdenDto = {
      idOrden: idOrden,
      estadoDeOrden: estadoDeOrden
    };

    this.adminService.cambiarElEstadoDeLaOrden(cambiarElEstadoDeLaOrdenDto).subscribe(res => {
      if (res.id != null) {
        this.snackBar.open("El Estado De La Orden Se Ha Actualizado", "Close", { duration: 5000 });
        this.recuperarOrdenesRealizadas();
      } else {
        this.snackBar.open("Algo Esta Incorrecto", "Close", { duration: 5000 });
      }
    })
  }

  eliminarPedido(idOrden: number) {
    this.adminService.borrarOrden(idOrden).subscribe(
      res => {
        this.snackBar.open("La Orden Ha Sido Eliminada", "Close", { duration: 5000 });
        setTimeout(() => {
          this.recuperarOrdenesRealizadas();
        }, 1000);
      },
      error => {
        console.error("Error al eliminar la orden:", error);
        this.snackBar.open("Error al eliminar la orden", "Close", { duration: 5000 });
      }
    );
    
  }


}
