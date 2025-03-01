import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../servicio/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-actualizar-orden',
  standalone: false,

  templateUrl: './actualizar-orden.component.html',
  styleUrl: './actualizar-orden.component.css'
})
export class ActualizarOrdenComponent {

  formularioDeRealizarPedido!: FormGroup;
  montoTotal: number = 0
  idOrden: any;
  orden: any

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.idOrden = this.activatedRoute.snapshot.params['id'];
    this.recuperarOrdenDelUsuarioPorId();
    this.formularioDeRealizarPedido = this.fb.group({
      idOrden: [this.idOrden],
      idUsuario: [null],
      direccion: [null, [Validators.required]],
      nroDeTelf: [null, [Validators.required]],
      cantidad: [null, [Validators.required]],
      montoTotal: [null, [Validators.required]],
      descripcion: [null],
    })

  }

  actualizarPedido() {
    this.customerService.actualizarOrden(this.formularioDeRealizarPedido.value).subscribe(res => { })

    this.snackBar.open("Se Ha Actualizado El Pedido Correctamente, Por Favor Espere 1 Segundo", "Close", { duration: 5000 })

    // Redirigir después de 1 segundo (1000 ms)
    setTimeout(() => {
      this.router.navigateByUrl("/cliente/Mis Ordenes");
      this.closeForm();
    }, 1000);

  }

  calcularMontoTotal(cantidad: number) {

    this.montoTotal = this.orden.precioDelProducto * cantidad;
    this.formularioDeRealizarPedido.patchValue({ montoTotal: this.montoTotal });

  }

  recuperarOrdenDelUsuarioPorId() {
    this.customerService.recuperarOrdenDelUsuarioPorIdDeLaOrden(this.idOrden).subscribe(res => {
      this.orden = res;
    });
  }

  closeForm() {
    this.dialog.closeAll();
  }


}
